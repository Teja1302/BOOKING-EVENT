
const sequelize = require("../config/db");

const bookEvent = require('./bookingeventModel');
const User = require('./userModel');
const Event = require('./eventModel');

(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
})();


module.exports = { bookEvent, User, Event }
