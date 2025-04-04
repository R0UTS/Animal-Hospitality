const express = require('express');
const router = express.Router();
const Animal = require('../models/Animal');

// Create a new animal
router.post('/', async (req, res) => {
    try {
        const animal = new Animal(req.body);
        await animal.save();
        res.status(201).send(animal);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all animals for a specific owner
router.get('/farmer/:ownerId', async (req, res) => {
    try {
        const animals = await Animal.find({ owner: req.params.ownerId });
        res.send(animals);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;