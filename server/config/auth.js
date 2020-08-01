'use strict';

const jwt = require("jsonwebtoken");

module.exports = ((req, res, next) => {

    const AuthBearerHeader = req.headers['authorization'];

    if (!AuthBearerHeader) return res.sendStatus(401);

    const token = AuthBearerHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, userResults) => {
        if (error) return res.sendStatus(401);

        req.userTokenResults = userResults;
    });

    return next();
});