const Eventrouter = require('express').Router()


const { createEvent, getEventsAll, getEvent, deleteEvent, updateEvent } = require('../controllers/EventController');
const { verifyToken } = require('../middleware/authenticate');

Eventrouter.post('/event/create/', [verifyToken], createEvent);
Eventrouter.get('/event/get/list', getEventsAll);
Eventrouter.get('/event/get', getEvent);
Eventrouter.delete('/event/delete', deleteEvent);
Eventrouter.put('/event/put', updateEvent);


module.exports = Eventrouter;