const express = require('express');
const ideasRouter = express.Router();
const dataBase = require('./db.js')
const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');

ideasRouter.get('/', (req, res) => {
    res.send(dataBase.getAllFromDatabase('ideas'))
})

ideasRouter.post('/', checkMillionDollarIdea, (req, res) => {
    const newIdea = dataBase.addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
    //     const newMinion = dataBase.addToDatabase('minions', req.body);
//     res.status(201).send(newMinion);
})

ideasRouter.get('/:ideaId', (req, res) => {
    req.params.ideasValue = dataBase.getFromDatabaseById('ideas', req.params.ideaId)  
    const ideaId = req.params.ideaId
    if (isNaN(Number(ideaId)) === true) {
        res.status(404)
    } else if (req.params.ideasValue === null || req.params.ideasValue === undefined) {
        res.status(404)
    }
    res.send(req.params.ideasValue)
})

ideasRouter.put('/:ideaId', (req, res) => {
    req.body.id = req.params.ideaId
    const updatedData = dataBase.updateInstanceInDatabase('ideas', req.body)
    const ideaID = req.params.ideaId
    if (isNaN(Number(ideaID)) === true) {
        res.status(404)
    } else if (updatedData === null) {
        res.status(404)
    }
    res.send(updatedData)
})

ideasRouter.delete('/:ideaId', (req, res) => {
    const deletedItem = dataBase.deleteFromDatabasebyId('ideas', req.params.ideaId)
    const ideaID = req.params.ideaId
    if (!deletedItem) {
        res.status(500);
    } else {
        res.status(204);
    }

    if (ideaID > dataBase.getAllFromDatabase('ideas').length) {
        res.status(404);
    } else if (isNaN(Number(ideaID)) === true) {
        res.status(404);
    }
    res.send()
})

module.exports = ideasRouter;