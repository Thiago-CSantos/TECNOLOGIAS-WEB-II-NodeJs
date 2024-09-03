// Importando Módulo Express
const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database/database");
const perguntaModel = require("./database/pergunta");
const pergunta = require("./database/pergunta");
// Criando a instância do Express
const app = express();

// Banco de Dados
connection
  .authenticate()
  .then(() => {
    console.log("Conectado ao banco de dados!");
  })
  .catch((msgErro) => {
    console.log("msgErro");
  });

// "false" serve para não tratar valores dentro de um vetor ou objeto. Caso queira, será "true"
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Usar EJS como View Engine - Renderizador de HTML
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  // select * from perguntas
  perguntaModel.findAll({ raw: true }).then((pergunta) => {
    // console.log(pergunta)
    res.render("home", {
      pergunta: pergunta,
    });
  });
});

app.get("/teste", function (req, res) {
  res.render("outros/teste");
});

app.post("/savequestion", (req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;

  perguntaModel
    .create({
      titulo: titulo,
      descricao: descricao,
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/question", function (req, res) {
  res.render("question");
});

app.get("/:question", function (req, res) {
  res.render("question");
});

app.get("/:nome/:dev", function (req, res) {
  var nome = req.params.nome;
  var dev = req.params.dev;
  var exibirMensagem = true;

  var produtos = [
    { nome: "Mouse", preco: 150 },
    { nome: "Teclado", preco: 300 },
    { nome: "Monitor", preco: 1900 },
  ];

  res.render("index", {
    nome: nome,
    dev: dev,
    company: "Metatron",
    salary: 10000,
    mensagem: exibirMensagem,
    produtos: produtos,
  });
});

app.listen(8181, function (erro) {
  if (erro) {
    console.log("Erro");
  } else {
    console.log("Servidor online!");
  }
});
