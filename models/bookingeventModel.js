const { Sequelize } = require('sequelize');

const sequelize = require("../config/db");

const User = require('./userModel')
const Event = require('./eventModel');


let bookEvent = sequelize.define('bookEvent', {
    bookEventId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,

    },
    eventId: {
        type: Sequelize.INTEGER,
        allowNull: false,

    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: true,

    },
    bookingStatus: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: true
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
    },
    createdFrom:
    {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "MOBILE",
        type: Sequelize.ENUM("MOBILE", "WEB")
    },
    updatedFrom:
    {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "MOBILE",
        type: Sequelize.ENUM("MOBILE", "WEB")
    }
},

)

bookEvent.belongsTo(User, { foreignKey: 'userId', as: "userDetails" })

bookEvent.belongsTo(Event, { foreignKey: 'eventId', as: "eventDetails" })   


module.exports = bookEvent;