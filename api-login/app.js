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

app.get("/valida-acesso",(req,res)=>{
    const token = req.headers['authorization'].split(' ')[1];
    jwt.verify(token,SECRET_KEY,{maxAge:"1m"},(err, decoded)=>{
        
        if(err){
            if(err.name === "TokenExpiredError"){
                return res.status(401).send("Token expirado!");
            }
            return res.status(401).send("Token invalido!");
        }
        
        res.status(201).json({message:`Acesso permitido!`, id: decoded.id, username: decoded.username})
    });
});

app.get("/news",async (req,res)=>{
    const url = "https://newsapi.org/v2/everything" ;
    const parametros = "?q=tesla&from=2024-09-12&sortBy=publishedAt&apiKey=20dc8ced659a47a6812110344c77dbc8";

    const response = await fetch(url+ parametros);
    const json  = await response.json();

    console.log(json);

});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});