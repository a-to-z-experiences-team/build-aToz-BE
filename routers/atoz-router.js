const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../data/dbHelpers.js');

const router = express.Router();



router.get('/home', async (req, res) => {
    try {
        const exp = await db.findExpereinces(req.query)
        res.status(200).json(exp);
    } catch(error) {
        res.status(404).json({ message: 'Error retrieving exp' })
    }
})

// router.post('/signup', async(req, res) => {
//     try {
//         // console.log(req.body)
//         const user = await db.addUser(newUser);
//         res.status(200).json(user);
//     } catch(error) {
//         res.status(404).json({
//             error,
//             message: 'Error adding user'
//         })
//     }
// })

router.post('/signup', (req, res) => {
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

router.get('/experiences/:id', async(req,res) => {
    try {
        // console.log(req.params.id)
        const exp = await db.findExpById(req.params.id)
        res.status(200).json(exp);
    } catch(error) {
        console.log(error)
        res.status(500).json({
            message: "Cannot find experience"
        })
    }
})

router.get('/users/all', async(req,res) => {
    try {
        const users = await db.getAllUsers();
        res.status(200).json(users);
    } catch(error) {
        res.status(500).json({
            message: "error in server"
        })
    }
})

module.exports = router;