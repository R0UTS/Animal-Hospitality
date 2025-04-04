const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
    animalId: {
        type: String,
        required: true,
        unique: true,
    },
    Species: {
        type: String,
        required: true,
    },
    breed: {
        type: String,
    },
    age: {
        type: Number,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true,
    },
});

module.exports = mongoose.model('Animal', AnimalSchema);