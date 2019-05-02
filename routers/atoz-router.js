const express = require('express');

const db = require('../data/dbHelpers.js');

const router = express.Router();
const { authenticate } = require('../auth/restricted-middleware.js')

//home page route
router.get('/home', async (req, res) => {
    try {
        const exp = await db.findExpereinces(req.query)
        res.status(200).json(exp);
    } catch(error) {
        res.status(404).json({ message: 'Error retrieving exp' })
    }
})


//get experiences by ID
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


//get all users
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

//delete user 
router.delete('/:id', async(req, res) => {
    try {
        const user = await db.removeUser(req.params.id);
        if(user) {
            res.status(200).json({
                message: 'user has been deleted'
            })
        } else {
            res.status(404).json({
                message: 'could not find user'
            })
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: 'Error removing user'
        })
    }
})
//get experiences by creator ID
router.get('/experiencesby/:id', async(req, res) => {
    try {
        const exp = await db.getAllExpByUserId(req.params.id);
        res.status(200).json(exp);
    } catch(error) {
        res.status(500).json({
            message: 'unable to fetch experiences'
        })
    }
})

//post an experience
router.post('/experience', authenticate, async (req, res) => {
    const mainInfo = { ...req.body, createdBy: req.decodedjwt.subject };
    try {
        const exp = await db.addExp(mainInfo);
        // console.log(exp)
        res.status(200).json(exp);
    } catch(error) {
        console.log(error)
        res.status(500).json({
            message: 'Error adding an experience'
        })
    }
})


//edit an experience
router.put('/:id/editexperience', async (req, res) => {
    try {
        const editExp = await db.updateExp(req.params.id, req.body);
        if(editExp) {
            res.status(200).json(editExp);
        } else {
            res.status(404).json({
                message: 'unable to find experience to edit'
            })
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: 'Error updating experience'
        })
    }
})

//delete an exp
router.delete('/exp/:id', authenticate, async(req, res) => {
    try {
        const userId = req.decodedjwt.subject
        const user = await db.findUserById(userId)
        const event = await db.findExpById(req.params.id)

        const createdBy = Number(event.createdBy)

        if(user.id === createdBy) {
            res.status(200).json({
                message: 'exp has been deleted'
            })
        } else {
            res.status(404).json({
                message: 'you are not the origional creator!'
            })
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: 'Error removing exp'
        })
    }
})


module.exports = router;