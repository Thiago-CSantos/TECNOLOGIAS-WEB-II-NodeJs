const express = require("express");
const path = require("path");
const app = express();


app.get("/home/:nome/:sobrenome?", (req, res) => {
    var nome = req.params.nome;
    var sobrenome = req.params.sobrenome;

    res.send(`<h1>Jhola, Hello World 02, ${nome}, ${sobrenome}</h1>`);
});

app.get("/cliente", (req, res) => {
    res.send("<h1>Cliente, Hello World</h1>");
});

app.get("/cliente/:cpf?", (req, res) => {
    res.send("<h1>Cliente Jhola, Hello World</h1>" + req.params.cpf);
});

app.get("/teste", (req, res) => {
    res.send("<h1>Teste, Hello World</h1>" + req.query["nome"]);

});

app.get("/calculadora", (req, res) => {

    var operador = req.query["operador"];
    var num1 = req.query["v1"];
    var num2 = req.query["v2"];
    var n1 = parseFloat(num1);
    var n2 = parseFloat(num2);

    var resultado;
    switch (operador) {
        case "+":
            resultado = n1 + n2;
            break;
        case "-":
            resultado = n1 - n2
            break;
        case "*":
            resultado = n1 * n2
            break;
        case "/":
            resultado = n1 / n2
            break;
        case "%":
            resultado = n1 % n2
            break;
        default:
            break;
    }

    res.send(`<h1>Resultado de ${req.query["v1"]} ${req.query["operador"]} ${req.query["v2"]} = ${resultado}</h1>`);
});

const checkAuth = (req, res, next) => {
    req.authStatus = false;

    if (req.authStatus) {
        console.log("está logado, pode continuar");
        next()
    }
    else {
        console.log("Não está logado");
        next();
    }
}

app.use(checkAuth)

app.get("/caminho", (req, res) => {
    console.log("teste");
    res.sendFile(__dirname + "/pages" + "/index.html");
});

app.get("/caminho/form", (req, res) => {
    res.sendFile(__dirname + "/pages" + "/form.html");
});

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.post("/user/form", (req, res) => {

    console.log("fdsf");
    console.log(req.body);

    res.sendFile(__dirname + "/pages" + "/form.html");

});

app.listen(8181, (er) => {
    if (er) {
        console.log("Erro!");
    }
    else {
        console.log("Servidor iniciado");
    }
});