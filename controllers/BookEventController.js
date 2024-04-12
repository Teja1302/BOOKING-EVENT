const sequelize = require("../config/db");

const moment = require("moment")

const { bookEvent, Event } = require('../models/index');

const event = require("../models/eventModel")

const user = require("../models/userModel")

const createBookEvent = async function (req, res) {
    try {
        console.log("inputs ==>", req.userId);

        let { eventId } = req.body;

        let userId = req.userId

        createdAt = new Date();

        const findEvent = await Event.findOne({
            where: {
                eventId: eventId
            }

        })

        if (!findEvent) {
            return res.status(401).json({ message: 'event  not found ' })
        }


        const existingBooking = await bookEvent.findOne({
            where: {
                userId: userId,
                eventId: eventId
            }
        });

        if (existingBooking) {
            return res.status(200).json({ status: 400, message: 'booking Event already Exist', data: {} });
        }

        let bookingStatus = "CONFIRMED"

        const newBooking = await bookEvent.create({ eventId, userId, bookingStatus });

        return res.status(200).json({ status: 200, message: 'Booking data created successfully', data: newBooking });




    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Could not book event', error: error.message });
    }

}


const getBookEventsAll = async function (req, res) {
    try {
        let getBookEventsAll = await bookEvent.findAll({
            include: [
                { model: user, as: "userDetails" },
                { model: Event, as: "eventDetails" },
            ]
        }).catch(e => console.log("errr", e))
        console.log(getBookEventsAll);
        if (getBookEventsAll) {
            res.status(201).send({ status: 200, message: "Data listed Sucessfully", data: getBookEventsAll })

        } else {
            res.status(401).json({ status: 401, message: "data not found", data: {} })
        }
    }

    catch (error) {
        console.log("error", error)
    }
}

const getbookEvent = async function (req, res) {
    try {
        const userId = req.userId
        const bookevent = await bookEvent.findAll({
            where: {
                userId: userId
            },
            include: [{
                model: user, as: "userDetails"
            },
            { model: Event, as: "eventDetails" }]
        });
        if (!bookevent) {
            return res.status(404).json({ error: 'book event not found' });
        }
        return res.json(bookevent);
    } catch (error) {
        console.error('Error fetching bookevent:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
const deletebookEvent = async function (req, res) {
    try {
        const bookEventId = req.query.bookEventId;

        let bookEventDetails = await bookEvent.findOne({ where: { bookEventId: bookEventId, bookingStatus: "CONFIRMED" }, include: [{ model: Event, as: "eventDetails" }], raw: true });

        if (bookEventDetails) {

            let eventStartTime = bookEventDetails['eventDetails.startTime']


            const startMoment = moment(eventStartTime, "HH:mm");

            const endMoment = moment(moment(), "HH:mm");

            const duration = moment.duration(endMoment.diff(startMoment));

            const hoursDifference = duration.asHours();

            console.table({
                currentTime: moment().format("HH:mm"),
                eventStartTime: eventStartTime
            })

            console.log(hoursDifference)


            if (hoursDifference > 8) {
                const deletebookEventbyId = await bookEvent.update({ bookingStatus: req.body.bookingStatus }, {
                    where: {
                        bookEventId: bookEventId,
                    }
                });
                if (deletebookEventbyId) {
                    return res.status(200).json({ status: 200, message: "BookEvent Data deleted successfully", data: deletebookEventbyId });

                }
                else {
                    return res.status(400).json({ status: 400, message: "bookEvent not found", data: {} })
                }

            }
            else {

                return res.status(400).json({ status: 400, message: "Event not be cancelled before '8'hours", data: {} });

            }
        }
        else {
            return res.status(400).json({ status: 400, message: "Booking Event not found", data: {} });
        }




    } catch (error) {

        console.error('Error deleting bookEvent:', error);
    }
}
const updateBookEvent = async function (req, res) {
    try {
        const bookEventId = req.query.bookEventId;

        let inputData = req.body;

        const updateBookEvent = await bookEvent.findByPk(bookEventId);

        console.log("event", updateBookEvent)

        if (!updateBookEvent) {
            return res.status(404).json({ status: 400, message: 'data not found', data: {} });
        }
        else {

            let updateDetails = await bookEvent.update(inputData, {
                where: {
                    bookEventId: bookEventId
                }
            })
            return res.status(404).json({ status: 200, message: 'bookingdata updated Sucessfully', data: updateDetails });
        }
    } catch (error) {
        console.error('Error updating bookevent:', error);
        res.status(500).json({ error: 'Could not update bookevent' });
    }
}

module.exports = { createBookEvent, getBookEventsAll, getbookEvent, deletebookEvent, updateBookEvent };