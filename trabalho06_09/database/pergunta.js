const sequelize = require("sequelize");
const connection = require("./database");

const pergunta = connection.define("pergunta", {
  titulo: {
    type: sequelize.STRING,
    allowNull: false,
    // primaryKey: true,
    // autoIncrement: true
  },
  descricao: {
    type: sequelize.TEXT,
    allowNull: false,
  },
});

// force -> serve para forçar a criação da tabela mesmo que ela já exista
pergunta.sync({ force: false }).then(() => {
  console.log("Tabela de perguntas criadas!");
});

module.exports = pergunta;
