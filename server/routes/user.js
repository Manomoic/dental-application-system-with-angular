const user = require('express').Router()

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const isUserAuthentication = require('../config/auth');
const UserModel = require('../model/User');
const BookingModel = require('../model/Booking');
require('dotenv').config();

user.post('/register', cors(), (req, res) => {
    const registerFormDetails = req.body;
    // Hash password for better encryptions
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(registerFormDetails.password, salt);
    // Load up all the form fields in an object
    const userObjectsForUsers = {
        firstname: '',
        lastname: '',
        contacts: '',
        gender: '',
        address: '',
        email: registerFormDetails.email,
        password: hashPassword,
        isEmailVerified: 'false',
        role: registerFormDetails.selectUserAccount,
        doctorsName: '',
        dentalType: '',
        appointmentDate: '',
        isDateConfirmed: 'No'
    };
    // assign the object values as Class properties
    let dbModel = new UserModel(userObjectsForUsers);

    UserModel.findOne({
        email: userObjectsForUsers.email
    }, (error, userResults) => {
        // error handling
        if (error) return res.json({
            errorOutput: error
        });
        // does user exist?
        if (userResults == null || (!userResults)) {
            // if the email is not available, then create the account
            dbModel.save((error, savedResults) => {
                // error handling
                if (error) return res.json({
                    errorOutput: error
                });
                // create and store a cookie token
                const token = jwt.sign({
                    _id: savedResults._id,
                    email: savedResults.email
                }, process.env.JWT_SECRET_KEY, {
                    expiresIn: '1d'
                });
                // set the token header
                res.header('Authorization', token);

                res.json({
                    accessToken: token
                });
                // output the saved record on the console
                console.log(savedResults);
            });

        } else {
            // flag an error message if the email already exists.
            return res.json({
                errorMessage: `${userResults.email} Has Already Been Taken.`
            });
        }
    });
});

user.post('/login', (req, res) => {
    let loginFormDetails = req.body;

    let userObjects = {
        email: loginFormDetails.email,
        password: loginFormDetails.password,
        isEmailVerified: 'false'
    };
    // Is email available?
    UserModel.findOne({
        email: userObjects.email
    }, (error, isEmailAvailable) => {
        if (error) return res.json({
            errorOutput: error
        });

        if (isEmailAvailable == null || (!isEmailAvailable)) {
            // Provided an invalid/none existant email
            return res.json({
                invalidEmail: 'Invalid Provided Email.'
            });
        } else {
            // compare the passwords loaded from the screen to the DB
            const isMatch = bcrypt.compare(userObjects.password, isEmailAvailable.password);

            isMatch
                .then((matchedPasswords) => {
                    // Provided an invalid/none existant password
                    if (!matchedPasswords) return res.json({
                        invalidPassword: 'Incorrect Provided Password.'
                    });
                    // If email is valid, update the result
                    UserModel.findOneAndUpdate({
                        email: userObjects.email
                    }, {
                        isEmailVerified: 'true',
                        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
                    }, (error, isUserEmailRecordUpdated) => {
                        if (error) return res.json({
                            errorOutput: error
                        });
                        // create and store a cookie token
                        const token = jwt.sign({
                            _id: isUserEmailRecordUpdated._id,
                            email: isUserEmailRecordUpdated.email
                        }, process.env.JWT_SECRET_KEY, {
                            expiresIn: '1d'
                        });
                        // set the token header
                        res.header('Authorization', token);

                        res.json({
                            accessToken: token
                        });
                    });
                });
        }
    });
});

user.get('/logout', isUserAuthentication, (req, res) => {
    /**
     * Is the email active?
     * check against the cookie token
     * update the logout date and time
     * set the verification of email to false (cause the user has logged out)
     */
    UserModel.findOneAndUpdate({
        email: req.userTokenResults.email
    }, {
        isEmailVerified: 'false',
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }, (error, isUserLoggedOut) => {
        if (error) return res.json({
            errorOutput: error
        });

        console.log(isUserLoggedOut)
    });
});

module.exports = user;