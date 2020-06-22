const mongoose = require('mongoose');
const { Schema } = mongoose;

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String, required: true
    },
    password: {
        type: String, required: true
    },
    email_activate_at: {
        type: Date,
    },
    is_activated: {
        type: Boolean,
        default: false
    },
    role: {
        type: String, default: 'basic',
        enum: ['basic', 'admin']
    },
    date: {
        type: Date,
        default: Date.now
    }

});

const User = mongoose.model('User', usersSchema, 'users');

module.exports = User;