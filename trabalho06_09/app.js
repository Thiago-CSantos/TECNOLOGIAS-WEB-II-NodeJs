const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Connection } = require('pg');
const connection = require('./database/database');
const perguntaModel = require('./database/pergunta');
const respostaModel = require('./database/resposta');
const loginModel = require('./database/login');
const { where } = require('sequelize');
const pergunta = require('./database/pergunta');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.set("view engine", "ejs");
app.use(express.static('public'));

// Rotas 
app.listen(port, () => {
    console.log("Servidor iniciado");
})

app.get('/login', (req, res) => {
    res.render('login')
});

app.post('/entrar', (req, res) => {
    var email = req.body.email; // use o 'thiagocarretero@gmail.com' '123'
    var senha = req.body.senha;

    loginModel.findAll({
        raw: true, where: {
            email: email,
            senha: senha
        }
    }).then(p => {
        console.log(p[0].senha);
        console.log(senha);
        if (p[0].senha == senha && p[0].email == email) {
            res.redirect('/')
        }
    }).catch(e=>{
        res.redirect('/login')
    })

});

app.get('/', (req, res) => {
    // select * form perguntas
    perguntaModel.findAll({ raw: true, order: [['id', 'desc']] }).then(p => {
        res.render('index', {
            perguntas: p
        });
    })
});

app.get('/question', (req, res) => {
    var id = req.params.id;

    perguntaModel.findOne({
        where: { id: id }
    }).then(p => {
        if (pergunta != undefined) {
            res.render('detalhePergunta', {
                pergunta: p
            })
        } else {
            res.redirect('/')
        }
    });

    res.render('question')
});

app.get('/question/:id', (req, res) => {
    var id = req.params.id;

    perguntaModel.findOne({
        where: { id: id }
    }).then(p => {
        if (pergunta != undefined) {
            respostaModel.findAll({
                where: { perguntaId: p.id },
                order: [['id', 'DESC']]
            }).then(r => {
                res.render('detalhePergunta', {
                    pergunta: p,
                    respostas: r
                })
            })

        } else {
            res.redirect('/')
        }
    });

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

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;

    respostaModel.create({
        corpo: corpo,
        pergunta: perguntaId
    }).then(() => {
        res.redirect('/question' + perguntaId)
    })
});

app.get('resposta/delete/:id', (req, res) => {
    var id = req.params.id;
    respostaModel.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('back')
    })
});

// Banco de dados

connection.authenticate().then(() => {
    console.log("Conectado ao banco");
})
    .catch((msgErro) => {
        console.log("msgError: " + msgErro);

    })