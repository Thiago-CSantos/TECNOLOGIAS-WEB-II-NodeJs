"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../connection/database"));
const connection = database_1.default.getInstance();
const User = connection.define("users", {
    id: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    senha: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
});
User.sync({ force: false }).then(() => {
    console.log("Tabela 'Users' criada ou já existente!");
});
exports.default = User;
