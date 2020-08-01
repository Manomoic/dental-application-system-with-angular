'use strict';

const mongoose = require('mongoose');
require('dotenv').config();

module.exports = async () => {

    const conx = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

    console.log(`MongoDB Connected On Port ${conx.connection.port}`);
}