const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/animal-hospitality', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Routes
const userRoutes = require('./routes/user');
const animalRoutes = require('./routes/animal');
const emergencyRoutes = require('./routes/emergency');

app.use('/api/user', userRoutes);
app.use('/api/animal', animalRoutes);
app.use('/api/emergency', emergencyRoutes);

app.get('/', (req, res) => {
    res.send('Animal Hospitality Backend is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});