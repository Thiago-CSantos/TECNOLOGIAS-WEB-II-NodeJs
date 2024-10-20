import { DataTypes, Sequelize } from "sequelize";
import Database from "../connection/database";

const connection: Sequelize = Database.getInstance();

const User = connection.define("users", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

User.sync({ force: false }).then(() => {
    console.log("Tabela 'Users' criada ou já existente!");
});

export default User;