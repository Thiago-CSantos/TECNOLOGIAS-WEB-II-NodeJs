// leitura pelo console 
const readLine = require('readline');
let rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.question('digite um numero 01? ', (num2) => {
    rl.question('digite um numero 02? ', (num1) => {
        console.log(parseFloat(num2) + parseFloat(num1));
        rl.close();
    });
});
