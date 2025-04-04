const express = require('express');
const router = express.Router();
const Emergency = require('../models/Emergency');

// Create a new emergency report
router.post('/', async (req, res) => {
    try {
        const emergency = new Emergency(req.body);
        await emergency.save();
        res.status(201).send(emergency);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all emergency reports (Example - You might want to filter/sort this)
router.get('/', async (req, res) => {
    try {
        const emergencies = await Emergency.find();
        res.send(emergencies);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;