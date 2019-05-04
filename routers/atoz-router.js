const express = require('express');

const db = require('../data/dbHelpers.js');

const router = express.Router();
// const { authenticate } = require('../auth/restricted-middleware.js')

//home page route for all exp
router.get('/home', async (req, res) => {
    try {
        const exp = await db.findExpereinces(req.query)
        res.status(200).json(exp);
    } catch(error) {
        res.status(404).json({ message: 'Error retrieving exp' })
    }
})


//find experiences by ID
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


//find one user
router.get('/users/:id', async(req,res) => {
    const userId = req.decodedjwt.subject

    try{
        const user = await db.findUserById(userId)
        res.status(200).json(user)
    } catch(error) {
        res.status(500).json({
            message: 'cannot find user'
        })
    }
})

//edit user
router.put('/user/:id', async (req, res) => {
    try {
        //puts decoded token id in userId
        const userId = req.decodedjwt.subject

        //then searches for user in db using token
        const user = await db.findUserById(userId)

        if(userId === user.id) {
            const editUser = await db.updateUser(req.params.id, req.body);
            res.status(200).json(editUser);
        } else {
            res.status(404).json({
                message: "User could not be found"
            })
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: 'Error updating user'
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
router.post('/experience', async (req, res) => {
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
        //puts decoded token in userId
        const userId = req.decodedjwt.subject

        //then searches for user in db using token
        const user = await db.findUserById(userId)

        //then finds event from :id
        const event = await db.findExpById(req.params.id)

        //changes decoded token into a integer
        const createdBy = Number(event.createdBy)

        //if user token and created by matches then runs edit
        if(user.id === createdBy) {
            await db.updateExp(req.params.id, req.body);
            const allevents = await db.findExpereinces()
            res.status(200).json({allevents, message: `event ${event.id} has been edited successfully`});
        } else {
            res.status(404).json({
                message: 'not the origional creator'
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
router.delete('/exp/:id', async(req, res) => {
    try {
        const userId = req.decodedjwt.subject
        const user = await db.findUserById(userId)
        const event = await db.findExpById(req.params.id)
        const createdBy = Number(event.createdBy)
        
        if(user.id === createdBy) {
            await db.removeExp(event.id)
            const allevents = await db.findExpereinces()
            res.status(200).json({allevents,
                message: `exp ${event.id} has been deleted`
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