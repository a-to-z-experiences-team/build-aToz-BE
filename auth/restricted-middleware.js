const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config/secrets.js');

module.exports = {
    authenticate,
    generateToken
}

function authenticate(req,res,next) {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if(err) {
                res.status(401).json({
                    err: 'user not verified'
                })
            } else {
                // console.log(decodedToken.subject)
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


function generateToken(user) {
    const payload = {
        subject:user.id,
        username: user.username
    }

    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, jwtSecret, options)
}
