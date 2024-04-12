const { Sequelize } = require('sequelize');

console.log(process.env.DATABASE)

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log('Database connected sucessfully!');

}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

module.exports = sequelize;
