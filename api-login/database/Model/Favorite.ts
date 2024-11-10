import { DataTypes, Sequelize } from "sequelize";
import Database from "../connection/database";
import Users from "./Users";

const connection: Sequelize = Database.getInstance();

const Favorite = connection.define("favorite", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_user:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Users,
            key: 'id'
        }
    },
    urlNew: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    urlImage: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
});

Users.hasMany(Favorite, {foreignKey: 'id_user'});
Favorite.belongsTo(Users, {foreignKey: 'id_user'});

Users.sync({ force: false }).then(() => {
    console.log("Tabela 'Users' criada ou já existente!");
    Favorite.sync({ force: false }).then(() => {
        console.log("Tabela 'Favorite' criada ou já existente!");
    });
});

export default Favorite;