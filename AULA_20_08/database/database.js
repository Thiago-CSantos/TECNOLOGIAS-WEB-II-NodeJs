const Sequelize = require("sequelize");

const connection = new Sequelize("projetopratico", "postgres", "root", {
  host: "localhost",
  dialect: "postgres", // Altere para 'postgres' para usar PostgreSQL
  port: 5432, // A porta padrão do PostgreSQL é 5432
});

module.exports = connection;
