import express, { Request, Response, NextFunction } from 'express';
import Userdb from '../database/Model/Users';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import UserDTO from './DTO/UserDTO';
import User from './Model/User';
import Favorite from './Model/Favorite';
import ErrorResponse from './Err/ErroResponse';
import ErrorResponseStatus from './Err/ErrorResponseStatus';
import ValidateAccessResponse from './interface/ValidateAccessResponse';
import bcrypt from 'bcrypt';
import axios from "axios";
import { format } from "date-fns";
import FavoriteDTO from './DTO/FavoriteDTO';

// Configurações
const app = express();
const PORT: number | string = process.env.PORT || 3000;
const SECRET_KEY: string = 'thiago_secreto';
const API_KEY: string = "20dc8ced659a47a6812110344c77dbc8";

// Middleware para parsing de JSON
app.use(bodyParser.json());

// Rota de login
app.post('/login', async (req: Request, res: Response) => {
    const { emailPost, senhaPost } = req.body as { emailPost: string; senhaPost: string };
    try {

        console.log(emailPost);
        console.log(senhaPost);

        const user = await Userdb.findOne({
            where: {
                email: emailPost,
            }
        });

        if (user) {

            const senhaValida = await bcrypt.compare(senhaPost, user.dataValues.senha);

            if (!senhaValida) {
                res.status(401).json({ message: 'Invalid credentials' });
            }

            // Gera um token JWT
            const token = jwt.sign({ id: user.dataValues.id, email: user.dataValues.email }, SECRET_KEY, { expiresIn: '1d' });
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(401).json({ message: 'Invalid credentials' + error });
    }
});

app.get("/teste", (req: Request, res: Response): void => {
    res.json({ teste: 'oloko' })
});

app.get("/ibovespa", async (req: Request, res: Response) => {
    const url = 'https://query1.finance.yahoo.com/v8/finance/chart/^BVSP?region=BR&lang=pt-BR&interval=1d&range=1mo';
    try {
        const response = await axios.get(url);
        const data = response.data.chart.result[0];

        const timestamps = data.timestamp;
        const closes = data.indicators.quote[0].close;

        // Criando uma lista de objetos com data e fechamento
        const ibovData = timestamps.map((timestamp: number, index: number) => {
            const date = new Date(timestamp * 1000); // Converte para milissegundos
            const fechamento = closes[index];
            return {
                data: format(date, 'dd-MM-yyyy'),
                fechamento
            };
        });

        res.json({ dados: ibovData });
    } catch (error) {
        console.error('Erro ao obter dados do IBOV:', error);
        res.status(500).json({ erro: 'Erro ao obter dados do IBOV' });
    }
});

// Rota para validar o token
app.get("/valida-acesso", (req: Request, res: Response<ValidateAccessResponse | ErrorResponse>): void => {
    const authHeader: string | undefined = req.headers['authorization']!;

    if (!authHeader) {
        res.status(403).json({ message: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, SECRET_KEY, { maxAge: "1m" }, (err, decoded: any) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                res.status(401).send({ message: "Token expirado!" });
            }
            return res.status(401).send({ message: "Token invalido!" });
        }

        res.status(201).json({ message: `Acesso permitido!`, id: decoded.id, username: decoded.username });
    });
});

// Rota para buscar notícias
app.get("/news", User.validateToken, async (req: Request, res: Response<ErrorResponse | any>): Promise<void> => {
    const url: string = "https://newsapi.org/v2/everything";
    const queryKey = Object.keys(req.query);

    // Parametros
    // q = Palavras-chave ou frases para pesquisar no título e no corpo do artigo
    // from = Uma data e hora opcional para o artigo mais antigo permitido. Isso deve estar no formato ISO 8601 (por exemplo, 2024-10-12ou 2024-10-12T01:19:29)
    // to = Uma data e hora opcional para o artigo mais recente permitido. Isso deve estar no formato ISO 8601 (por exemplo, 2024-10-12ou 2024-10-12T01:19:29)
    // language = O código ISO-639-1 de 2 letras do idioma para o qual você quer obter manchetes. Opções possíveis: ar de en es fr he it nl no pt
    // sortBy = A ordem de classificação dos artigos. Opções possíveis: relevancy, popularity, publishedAt.
    //      relevancy= artigos mais relacionados qvêm primeiro.
    //      popularity= artigos de fontes e editoras populares vêm primeiro.
    //      publishedAt= artigos mais recentes vêm primeiro.
    //      Padrão:publishedAt

    // Lista de chaves obrigatórias
    const requiredKeys = ['q', 'from', /*'to',*/ 'language'];

    // Valida parâmetros obrigatórios
    const validateParams = requiredKeys.every(x => queryKey.includes(x));
    if (!validateParams) {
        res.status(412).send({
            message: "Por favor informe todos os parâmetros obrigatórios!",
            ex: ['q', 'from', /*'to',*/ 'language']
        });
        return;
    }

    const parametros: string = `?q=${req.query.q}&from=${req.query.from}&sortBy=${req.query.sortBy}&apiKey=` + API_KEY;

    try {
        const response = await fetch(url + parametros);
        const json: any = await response.json();
        res.json(json);
        return;
    } catch (error) {
        res.status(500).send({ message: 'Erro ao buscar notícias', error: error });
        return;
    }
});

app.post("/createUser", User.validateDTO(UserDTO), async (req: Request, res: Response) => {
    try {
        const { nome, email, senha } = req.body;

        const userDTO: UserDTO = new UserDTO(nome, email, senha);
        const user: User = new User();

        const newUser: User | ErrorResponse = await user.createUser(userDTO);

        if ('message' in newUser) {
            res.send(newUser);
        }

        res.json(newUser)

    } catch (error) {
        res.status(500).json({ message: `Erro ao crair o ususário `, error })
    }
});

app.post("/favorites", User.validateToken, async (req: Request, res: Response): Promise<void> => {
    const { id_user, urlNew, urlImage, title } = req.body;

    try {

        const favorite = new Favorite();
        const f: Favorite | ErrorResponseStatus = await favorite.createFavorite(new FavoriteDTO(id_user, urlNew, urlImage, title));

        if ('status' in f && f.status === 404) {
            throw new Error(f.message);
        }

        res.status(201).json({
            message: "Favorito adicionado com sucesso!",
            data: f
        });
    } catch (error) {
        res.status(500).json({
            message: "Erro ao adicionar favorito",
            error: error
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});