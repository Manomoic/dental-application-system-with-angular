'use strict';

const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const connectDB = require('./config/db');
const cookie_session = require('cookie-session');
const cors = require('cors');
const path = require('path');
const app = express();

// Parser
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

// DB Connection
connectDB();

app.use(
    cors({
        origin: '*',
        credentials: true,
        optionsSuccessStatus: 200
    })
);

// Cookie Session Setup
app.use(
    cookie_session({
        keys: [process.env.EXPRESS_COOKIES_SESSION],
        maxAge: Date.now(),
        httpOnly: true,
    })
);

// Loader
app.use((req, res, next) => {
    res.header("Access-Control-Request-Method", ["POST", "GET", "PUT", "DELETE"]);
    res.header("Access-Control-Allow-Origin", "*");
    res.locals.userTokenResults = req.userTokenResults || null;
    next();
});

// Middleware for development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routers
app.use('/user', require('./routes/user'));
app.use('/profile', require('./routes/profile'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Port ${PORT} Is Running In ${process.env.NODE_ENV}`));