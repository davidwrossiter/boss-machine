const express = require('express');
const meetingsRouter = express.Router();
const dataBase = require('./db.js');

meetingsRouter.get('/', (req, res) => {
    const arrayOfMettings = dataBase.getAllFromDatabase('meetings');
    // console.log(arrayOfMettings)
    res.send(arrayOfMettings);
})

meetingsRouter.post('/', (req, res) => {
    const newMeeting = dataBase.createMeeting();
    const newMeetings = dataBase.addToDatabase('meetings', newMeeting);
    res.status(201).send(newMeetings);
})

meetingsRouter.delete('/', (req, res) => {
    const resetMeetings = dataBase.deleteAllFromDatabase('meetings');
    res.status(204).send(resetMeetings)
})

module.exports = meetingsRouter;

