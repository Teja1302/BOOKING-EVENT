const { Sequelize } = require('sequelize');

const sequelize = require("../config/db");
const bookEvent = require('./bookingeventModel');


const User = sequelize.define('User', {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,

    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mobile: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
    },
    createdFrom:
    {
        type: Sequelize.STRING,
        allowNull: false,
        type: Sequelize.ENUM("MOBILE", "WEB")
    },
    updatedFrom:
    {
        type: Sequelize.STRING,
        allowNull: false,
        type: Sequelize.ENUM("MOBILE", "WEB")
    }
}
)
//User.belongsTo(bookEvent, { foreignKey:'bookeventId', as: "bookDetails" })

module.exports = User;