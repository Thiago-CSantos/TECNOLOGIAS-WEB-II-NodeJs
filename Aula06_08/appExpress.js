const express = require('express')// import express

const app = express();

app.get("/cliente/cadastro", (req, res) => {
    res.end("<h1>Cadastra Xucrão</h1>")
});

app.get("/Cliente", (req, res) => {
    res.end("<h1>Bem vindo! Xucrão</h1>")
});

app.get("/Home", (req, res) => {
    res.end("<h1>Bem vindo! Hello World Xucrão</h1>")
});

app.listen(8181, (err) => {
    if (err) console.log("Erro! ", err);

    else console.log("Servidor iniciado! ");
})

