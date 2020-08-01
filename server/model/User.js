'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: false,
    },
    lastname: {
        type: String,
        required: false,
    },
    contacts: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: false,
    },
    address: {
        type: String,
        required: false
    },
    gender: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: false,
    },
    email: {
        type: String,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please enter a valid Email Address.'
        ]
    },
    password: {
        type: String
    },
    isEmailVerified: {
        type: String,
        required: false,
        enum: ['true', 'false']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('user', userSchema);