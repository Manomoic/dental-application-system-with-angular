'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    user_role: {
        type: String,
        required: true
    },
    doctorsName: {
        type: String,
        required: false
    },
    dentalType: {
        type: String,
        required: false
    },
    appointmentDate: {
        type: String
    },
    isDateConfirmed: {
        type: String,
        enum: ['Yes', 'No']
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

module.exports = mongoose.model('booking', bookingSchema);