const express = require('express');
const minionsRouter = express.Router();
const dataBase = require('./db.js')


minionsRouter.get('/', (req, res) => {
    res.send(dataBase.getAllFromDatabase('minions'))
})

minionsRouter.post('/', (req, res) => {
    const newMinion = dataBase.addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
})

minionsRouter.get('/:minionId', (req, res, next) => {
    req.params.returnValue = dataBase.getFromDatabaseById('minions', req.params.minionId)  
    const minionId = req.params.minionId
    if (isNaN(Number(minionId)) === true) {
        res.status(404)
    } else if (req.params.returnValue === null || req.params.returnValue === undefined) {
        res.status(404)
    }
    res.send(req.params.returnValue)
})

minionsRouter.put('/:minionId', (req, res) => {
    req.body.id = req.params.minionId
    const updatedData = dataBase.updateInstanceInDatabase('minions', req.body)
    const minionId = req.params.minionId
    if (isNaN(Number(minionId)) === true) {
        res.status(404)
    } else if (updatedData === null) {
        res.status(404)
    }
    res.send(updatedData)
})

minionsRouter.delete('/:minionId', (req, res) => {
    const deletedItem = dataBase.deleteFromDatabasebyId('minions', req.params.minionId)
    const minionId = req.params.minionId
    if (!deletedItem) {
        res.status(500);
    } else {
        res.status(204);
    }

    if (minionId > dataBase.getAllFromDatabase('minions').length) {
        res.status(404);
    } else if (isNaN(Number(minionId)) === true) {
        res.status(404);
    }
    res.send()
})

module.exports = minionsRouter;