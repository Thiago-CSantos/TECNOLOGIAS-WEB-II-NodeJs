let http = require('http');

http.createServer((req, res) => {
    res.end("<h1>Bem vindo! Hello World Xucrão</h1>")
}
).listen(8181);

console.log("Servidor online!");

