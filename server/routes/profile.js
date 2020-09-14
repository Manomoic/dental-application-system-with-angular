'use strict';
const profile = require('express').Router();
const cors = require('cors');
const isUserAuthentication = require('../config/auth');
const UserModel = require('../model/User');
const BookingsModel = require('../model/Booking');

/**
 * @description: Display the active user's profile
 */
profile.get('/profile', isUserAuthentication, cors(), (req, res) => {
    // search user ID from the token
    UserModel.findOne({
        _id: req.userTokenResults._id
    }, (error, userProfile) => {
        if (error) return res.json({
            errorOutput: error
        });
        // Retrieves all user results
        res.json({
            profile: userProfile
        });
    });
});

/**
 * @description: Updates the user's profile
 */
profile.post('/update_profile', isUserAuthentication, cors(), (req, res) => {
    let updateFormDetails = req.body;

    let userObjects = {
        firstname: updateFormDetails.firstname,
        lastname: updateFormDetails.lastname,
        contacts: updateFormDetails.contacts,
        gender: updateFormDetails.gender,
        address: updateFormDetails.address
    };

    UserModel.findByIdAndUpdate({
        _id: req.userTokenResults._id
    }, userObjects, (error, recordUpdated) => {
        if (error) return res.json({
            errorOutput: error
        });
        // User response
        res.json({
            updatedResutlsMessage: 'Successfully Updated Your Profile.'
        });
        // User response in the console
        console.log(recordUpdated);
    });
});

/** 
 * @description - Make bookings
 */
profile.post('/create_bookings', isUserAuthentication, cors(), (req, res) => {
    let bookingsFormDetails = req.body;

    let bookingObjects = {
        doctorsName: bookingsFormDetails.doctorsName,
        dentalType: bookingsFormDetails.dentalType,
        appointmentDate: bookingsFormDetails.appointmentDate,
    };

    // Run through the Token and pull out the user_id, then update all the neccessary fields.
    UserModel.findByIdAndUpdate({
        _id: req.userTokenResults._id
    }, {
        doctorsName: bookingObjects.doctorsName,
        dentalType: bookingObjects.dentalType,
        appointmentDate: bookingObjects.appointmentDate,
        isDateConfirmed: 'Yes',
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }, (error, bookingsUpdated) => {
        if (error) return res.json({
            errorOutput: error
        });

        res.json({
            bookingsResults: bookingsUpdated
        });
        // Bookings response in the console
        console.log(bookingsUpdated);
    });
});

profile.get('/view_bookings', isUserAuthentication, cors(), (req, res) => {

    UserModel.findById({
        _id: req.userTokenResults._id
    }, (error, view_user_profile) => {
        if (error) return res.json({
            errorOutput: error
        });

        if (view_user_profile.role == 'User') {
            // Display user results only if the are [User Role Based]
            return res.json({
                userProfile: view_user_profile
            });
        } else if (view_user_profile.role == 'Admin') {

            UserModel.find().where('role').equals('User').limit(10).exec((error, view_all_user_profile) => {
                if (error) return res.json({
                    errorOutput: error
                });

                return res.json({
                    userProfile: view_all_user_profile
                });
            });
        }
    });
});

/**
 * @description - Display single user results
 * @param id - bookings ID from DB
 */
profile.get('/booking-details/:id', cors(), (req, res) => {
    let {
        id
    } = req.params;
    // Find user by selected Bookings ID
    UserModel.findById({
        _id: id
    }).exec((error, profileRecord) => {
        if (error) return res.json({
            errorOutput: error
        });

        return res.json({
            userProfile: profileRecord
        });
    });
});

module.exports = profile;