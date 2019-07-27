require('dotenv').config();

const knex = require('knex');

const dbConfig = require('../knexfile.js');

const db = knex(dbConfig.development);

// const dbEnv = process.env-DB_ENV || 'development';



module.exports = {
    findExpereinces,
    addUser,
    updateUser,
    findUserById,
    findExpById,
    getAllUsers,
    getAllExpByUserId,
    findBy,
    addExp,
    updateExp,
    removeUser,
    removeExp
}

    //users modules
    //add user
    async function addUser(user) {
        const [id] = await db('users').insert(user)

        return findUserById(id)
    }

    //find user by ID
    function findUserById(id) {
        return db('users')
        .where({ id })
        .first();
    }

    //get all users
    async function getAllUsers() {
        return db('users');
    }

    //filter users BY
    function findBy(filter) {
        return db('users').where(filter)
    }


    
    //edit users info
    function updateUser(id, changes) {
        return db('users')
        .where({ id })
        .update( changes, '*')
    }

    //delete users
    function removeUser(id) {
        return db('users')
        .where({ id })
        .del();
    }
    // ------------------------------------------------------------------

    //all experiences modules
    //find all experiences
    function findExpereinces() {
        return db('experiences')
            .innerJoin('users', 'createdBy', 'users.id')
            .select(
                'experiences.id',
                'exp_title',
                'exp_desc',
                'users.users_username as created by',
                'startsOn',
                'location',
                'maxGuests'
                )
    }
    
    //find experiences by its own ID
    function findExpById(id) {
        return db('experiences')
        .where({ id })
        .first();
    
    }
  
    //find experience filtered by the creators ID
    async function getAllExpByUserId(id) {
        return db('experiences')
        .innerJoin('users', 'createdBy', 'users.id')
        .select(
            'experiences.id',
            'exp_title',
            'exp_desc',
            'users.users_username as created by',
            'startsOn',
            'location',
            'maxGuests'
            )
        .where({ createdBy: id })
    }

    //add exp
    async function addExp(exp) {
        const [id] = await db('experiences').insert(exp);
        
        return findExpById(id)
        // return db('experiences').where({id}).first();
    }

    //edit exp info
    function updateExp(id, changes) {
        return db('experiences')
        .where({ id })
        .update( changes, '*')
    }

    //delete exp
    async function removeExp(id) {
        // const exp = await db('experiences').del(id)
        return db('experiences')
        .where({id})
        .del();
    }