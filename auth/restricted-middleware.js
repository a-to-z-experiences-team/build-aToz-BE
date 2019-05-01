// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// const db = require('../data/dbHelpers.js');

const { jwtSecret } = require('../config/secrets.js');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if(err) {
                res.status(401).json({
                    err: 'user not verified'
                })
            } else {
                req.decodedjwt = decodedToken;
                next();
            }
        })
    } else {
        res.status(401).json({
            err: "user not verified"
        })
    }
}