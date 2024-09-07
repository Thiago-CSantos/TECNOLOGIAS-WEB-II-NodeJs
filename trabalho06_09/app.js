const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Connection } = require('pg');
const connection = require('./database/database');
const perguntaModel = require('./database/pergunta');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.set("view engine", "ejs");
app.use(express.static('public'));

// Rotas 
app.listen(port, () => {
    console.log("Servidor iniciado");
})

app.get('/', (req, res) => {
    // select * form perguntas
    perguntaModel.findAll({ raw: true }).then(p => {
        res.render('index',{
            perguntas: p
        });
    })
});

app.get('/question', (req, res) => {
    res.render('question')
});

app.post('/savequestion', (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    // res.send("Formulario recebido: " + titulo + " com descricao: " + descricao);
    perguntaModel.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect('/')
    })
})

// Banco de dados

connection.authenticate().then(() => {
    console.log("Conectado ao banco");
})
    .catch((msgErro) => {
        console.log("msgError: " + msgErro);

    })