import { Sequelize } from "sequelize";

class Database {
  private static instance: Sequelize;

  private constructor() {}

  public static getInstance(): Sequelize {
    if (!Database.instance) {
      Database.instance = new Sequelize("projetopratico", "postgres", "root", {
        host: "localhost",
        dialect: "postgres",
        port: 5432,
        logging: false,
      });
    }
    return Database.instance;
  }
}

export default Database;