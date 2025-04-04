const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User Registration
router.post('/register', async (req, res) => {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.Password, 10); // 10 is the salt rounds
        const user = new User({
            userId: req.body.userId, // From class diagram
            userName: req.body.userName, // From class diagram
            Password: hashedPassword,
            contactInfo: req.body.contactInfo,
        });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// User Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ userName: req.body.userName }); // Use userName

        if (!user) {
            return res.status(401).send('Invalid credentials');
        }

        const passwordMatch = await bcrypt.compare(req.body.Password, user.Password);

        if (!passwordMatch) {
            return res.status(401).send('Invalid credentials');
        }

        // Create and assign a JWT
        const token = jwt.sign({ userId: user.userId }, 'your-secret-key', { expiresIn: '1h' }); // Replace 'your-secret-key'

        res.send({ token }); // Send the token to the client
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;