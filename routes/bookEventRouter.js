const bookingrouter = require('express').Router()

const { createBookEvent, getBookEventsAll, getbookEvent, deletebookEvent, updateBookEvent } = require('../controllers/BookEventController');
const { verifyToken } = require('../middleware/authenticate');


bookingrouter.post('/book/create', [verifyToken], createBookEvent);
bookingrouter.get('/book/get/all', getBookEventsAll);
bookingrouter.get('/book/get', [verifyToken], getbookEvent);
bookingrouter.delete('/book/delete', deletebookEvent);
bookingrouter.put('/book/update', updateBookEvent);
module.exports = bookingrouter;
