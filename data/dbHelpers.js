const knex = require('knex');

const dbConfig = require('../knexfile.js');

const db = knex(dbConfig.development);

module.exports = {
    findExpereinces,
    addUser,
    findUserById,
    findExpById,
    getAllUsers,
    getAllExpByUserId,
    findBy,
    addExp
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

    // ------------------------------------------------------------------

    //all experiences modules
    //find all experiences
    function findExpereinces() {
        return db('experiences')
            .innerJoin('users', 'createdBy', 'users.id')
            .select(
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
            'exp_title',
            'exp_desc',
            'users.users_username as created by',
            'startsOn',
            'location',
            'maxGuests'
            )
        .where({ createdBy: id })
    }

    async function addExp(exp) {
        const [id] = await db('experiences').insert(exp);
        
        return findExpById(id)
    }