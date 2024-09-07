const sequelize = require('sequelize');
const connection = require('./database');

const resposta = connection.define('resposta', {
    corpo: {
        type: sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: sequelize.INTEGER,
        allowNull: false
    }
})

resposta.sync({ force: false }).then(() => {
    console.log("Tabela de respostas criada!");

});

module.exports = resposta;