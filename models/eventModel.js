const { Sequelize } = require('sequelize');

const sequelize = require("../config/db");


const Event = sequelize.define('Event', {

    eventId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,

    },
    eventName: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    startTime: {
        type: Sequelize.STRING,
        allowNull: false
    },
    endTime: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdBy:
    {
        type: Sequelize.STRING,
        allowNull: false,
        type: Sequelize.ENUM("MOBILE", "WEB")
    },
    updatedBy:
    {
        type: Sequelize.STRING,
        allowNull: false,
        type: Sequelize.ENUM("MOBILE", "WEB")
    }
}
)



module.exports = Event;