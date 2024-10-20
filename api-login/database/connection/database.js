"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Database {
    constructor() { }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new sequelize_1.Sequelize("projetopratico", "postgres", "root", {
                host: "localhost",
                dialect: "postgres",
                port: 5432,
            });
        }
        return Database.instance;
    }
}
exports.default = Database;
