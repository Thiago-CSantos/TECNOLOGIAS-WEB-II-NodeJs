import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';

// Configurações
const app = express();
const PORT: number | string = process.env.PORT || 3000;
const SECRET_KEY: string = 'thiago_secreto';
const API_KEY: string = "20dc8ced659a47a6812110344c77dbc8";

// Tipagem para usuários
interface ValidateAccessResponse {
    message: string;
    id: number;
    username: string;
}
interface ErrorResponse {
    message: string;
    ex?: string[];
    error?: unknown
}
interface User {
    id: number;
    username: string;
    password: string;
}

const users: User[] = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
];

// Middleware para parsing de JSON
app.use(bodyParser.json());

// Rota de login
app.post('/login', (req: Request, res: Response) => {
    const { username, password } = req.body as { username: string; password: string };

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Gera um token JWT
        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1m' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
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
app.get("/news", async (req: Request, res: Response<ErrorResponse | any>): Promise<void> => {
    const url: string = "https://newsapi.org/v2/everything";
    const queryKey = Object.keys(req.query);

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


// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
