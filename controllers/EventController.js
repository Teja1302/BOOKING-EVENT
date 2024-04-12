
const sequelize = require("../config/db");

const { Event } = require('../models/index');

const createEvent = async function (req, res) {
    try {
        console.log("ewfwef", req.userId)

        let userId = req.userId;

        let { eventName, startTime, endTime, date, createdBy, updatedBy, createdAt, updatedAt } = req.body;
        createdAt = new Date();
        updatedAt = new Date();
        console.log("Request Body:", req.body);

        const checkdetails = await Event.findOne({
            where: {
                startTime: startTime,
                endTime: endTime,
                date: date
            }, raw: true
        })
        console.log("Existing Event:", checkdetails);
        if (checkdetails) {
          return res.status(400).json({ message: " An event already exists at this time" });
        }
        const createEvent = await Event.create({ eventName, startTime , endTime, date, createdBy, updatedBy, createdAt, updatedAt })
        return res.status(201).json(createEvent);
    } catch (error) {
        console.error('Error creating Event:', error);
        res.status(500).json({ error: 'Could not create Event', error: error });
    }

}

const getEventsAll = async function (req, res) {
    try {
        const getEventsAll = await Event.findAll()
        if (getEventsAll) {
            res.status(201).json({ status: 200, message: "Data listed Sucessfully", data: getEventsAll })

        } else {
            res.status(401).json({ status: 401, message: "data not found", data: {} })
        }
    }
    catch (error) {
        console.log("error", error)
    }
}

const getEvent = async function (req, res) {
    try {
        const eventId = req.query.eventId;
        const event = await Event.findByPk(eventId);
        if (!event) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.json(event);
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteEvent = async function (req, res) {
    try {
        const eventId = req.query.eventId;


        const deleteEventbyId = await Event.destroy({
            where: {
                eventId: eventId,

            }
        });
        if (deleteEventbyId) {
            res.status(200).json({ status: 200, message: "Event Data deleted successfully", data: deleteEventbyId });
            console.log('Event deleted successfully.');
        } else {
            res.status(400).json({ status: 400, message: "Event not found", data: {} })
        }
    } catch (error) {

        console.error('Error deleting Event:', error);
    }
}


const updateEvent = async function (req, res) {
    try {
        const eventId = req.query.eventId;

        let inputData = req.body;

        const updateEvent = await Event.findByPk(eventId);

        console.log("event", updateEvent)

        if (!updateEvent) {
            return res.status(404).json({ status: 400, message: 'data not found', data: {} });
        }
        else {

            let updateDetails = await Event.update(inputData, {
                where: {
                    eventId: eventId
                }
            })
            return res.status(404).json({ status: 200, message: 'data updated Sucessfully', data: updateDetails });
        }
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ error: 'Could not update event' });
    }
}


module.exports = { createEvent, getEventsAll, getEvent, deleteEvent, updateEvent };