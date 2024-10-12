const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'thiago_secreto';

app.use(bodyParser.json());

const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' }
];

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1m' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

app.get("/valida-acesso", (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    jwt.verify(token, SECRET_KEY, { maxAge: "1m" }, (err, decoded) => {

        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).send("Token expirado!");
            }
            return res.status(401).send("Token invalido!");
        }

        res.status(201).json({ message: `Acesso permitido!`, id: decoded.id, username: decoded.username })
    });
});

app.get("/news", async (req, res) => {
    // site para documentação : https://newsapi.org/docs/endpoints/everything
    const url = "https://newsapi.org/v2/everything";
    console.log(req.query);
    if(!req.query){

    }
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

    const apiKey = "20dc8ced659a47a6812110344c77dbc8";
    const parametros = "?q=tesla&from=2024-09-12&sortBy=publishedAt&apiKey=" + apiKey;

    const response = await fetch(url + parametros);
    const json = await response.json();

    return res.json(json);

});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});