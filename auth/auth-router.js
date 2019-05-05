const router = require('express').Router();

const bcrypt = require('bcryptjs');

const db = require('../data/dbHelpers.js');

const { generateToken } = require('../auth/restricted-middleware.js')

router.post('/register', (req, res) => {

    let user = req.body;
    // console.log(user)
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
    let { users_email, users_password } = req.body;

    // console.log(req.body.users_password)
    db.findBy({ users_email })
    .first()
    .then(user => {
        // console.log(user)
        if(user && bcrypt.compareSync(users_password, user.users_password)) {
            // console.log(user)
            const token = generateToken(user)
            res.status(200).json({
                token,
                message: `welcome ${user.users_firstName}`})
        } else {
            // console.log(error)
            res.status(401).json({
                message: 'Invalid Credentials'
            })
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json(error)
    })
})


// router.put('/user/:id', async (req, res) => {
//     try {
//         const editUser = await db.updateUser(req.params.id, req.body);
//         if(editUser) {
//             res.status(200).json(editUser);
//         } else {
//             res.status(404).json({
//                 message: "User could not be found"
//             })
//         }
//     } catch(error) {
//         console.log(error);
//         res.status(500).json({
//             message: 'Error updating user'
//         })
//     }
// })

module.exports = router;
