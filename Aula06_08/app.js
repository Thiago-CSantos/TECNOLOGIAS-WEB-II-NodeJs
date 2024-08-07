console.log("Hello world")

const num = 5;
let b = num + 80;

console.log(b);

// import de modulos
const imporSoma = require('./moduloInterno');
imporSoma.soma(9,10);

// importado um dos CORE Modules
const path = require('path')
const extensao = path.extname('arquivo.bat');
console.log(extensao);

// import do file system
const fs = require('fs');
fs.readFile('arquivo.txt','utf8', (err, data)=>{
    if(err) console.log(err);

    else console.log(data);
})

// contagem de impressões
console.count('Contagem');
console.count('Contagem');
console.count('Contagem');

// leitura pelo console 
const readLine = require('readline');
let rl = readLine.createInterface(process.stdin, process.stdout);

rl.question('Qual sua idade? ', (idade)=>{
    console.log('Sua idade é: '+ idade);
    rl.close();
});