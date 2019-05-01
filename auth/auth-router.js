const router = require('express').Router();

const bcrypt = require('bcryptjs')
const db = require('../routers/atoz-router.js')

router.post('/register', (req, res) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.users_password);
    user.users_password = hash;

    db.addUser(user)
        .then(saved => {
            res.status(201).json(saved)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: "error saving user"
            })
        })
})


router.post('/login', (req, res) => {
    let { users_userName, users_password } = req.body;

    // console.log(req.body.users_password)
    db.findBy({ users_userName })
    .first()
    .then(user => {
        // console.log(user)
        if(user && bcrypt.compareSync(users_password, user.users_password)) {
            // console.log(user)
            res.status(200).json(user)
        } else {
            // console.log(error)
            res.status(401).json({
                message: 'Invalid Credentials'
            })
        }
    })
    .catch(error => {
        // console.log(error)
        res.status(500).json(error)
    })
})

module.exports = router;
