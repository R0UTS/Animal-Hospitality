const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    userName: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    contactInfo: {
        type: String,
    },
});

module.exports = mongoose.model('User', UserSchema);