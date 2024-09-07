// para instalar mysql npm i mysql2
// npm install sequelize
// postgresql npm install --save pg pg-hstore
const Sequelize = require('sequelize');

//const connection = new Sequelize('projetopratico', 'root', '1234'); // mysql
const connection = new Sequelize('projetopratico', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgresql',
    port: 5432,
});


module.exports = connection;