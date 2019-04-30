const express = require('express')

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

router.post('/signup', async(req, res) => {
    try {
        // console.log(req.body)
        const user = await db.addUser(req.body);
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({
            error,
            message: 'Error adding user'
        })
    }
})

module.exports = router;