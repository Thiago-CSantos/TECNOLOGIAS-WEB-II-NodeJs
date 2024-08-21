const express = require("express");
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get("/", function (req, res) {
    res.send("Rota HOME");
});

app.get("/question", function (req, res) {
    res.render("../pages/form")
});

app.post("/enviar", function (req, res) {
    res.send("Formulario recebido")
});

app.get("/Index/:nome/:dev", function (req, res) {
    let n = req.params.nome;
    let d = req.params.dev;

    var p = [
        { nome: "mouse", preco: 150 },
        { nome: "Teclado", preco: 300 },
        { nome: "Monitor", preco: 1900 }
    ]

    res.render('../pages/index', {
        nome: n,
        dev: d,
        company: "Software",
        salario: 10000.50,
        msg: true,
        produtos: p
    });
});

app.listen(8181, function (erro) {
    if (erro) {
        console.log("Erro");
    } else {
        console.log("Servidor iniciado...");
    }
}); 
