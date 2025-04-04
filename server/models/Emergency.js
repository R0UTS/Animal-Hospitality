const mongoose = require('mongoose');

const EmergencySchema = new mongoose.Schema({
    emergencyld: {
        type: String,
        required: true,
        unique: true,
    },
    Description: {
        type: String,
        required: true,
    },
    Location: {
        type: String,
        required: true,
    },
    Status: {
        type: String,
    },
});

module.exports = mongoose.model('Emergency', EmergencySchema);