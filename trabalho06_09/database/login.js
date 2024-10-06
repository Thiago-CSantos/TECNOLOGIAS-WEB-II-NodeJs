const sequelize = require("sequelize");
const connection = require("./database");

const login = connection.define("login", {
  email: {
    type: sequelize.STRING,
    allowNull: false,
    // primaryKey: true,
    // autoIncrement: true
  },
  senha: {
    type: sequelize.STRING,
    allowNull: false,
  },
});

// force -> serve para forçar a criação da tabela mesmo que ela já exista
login.sync({ force: false }).then(() => {
  console.log("Tabela de login criadas!");
});

module.exports = login;
