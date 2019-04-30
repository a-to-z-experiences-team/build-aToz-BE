const knex = require('knex');

const dbConfig = require('../knexfile.js');

const db = knex(dbConfig.development);

module.exports = {
    findExpereinces,
    addUser,
    findUserById,
    findExpById
}


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
    
    function findUserById(id) {
        return db('users')
        .where({ id })
        .first();
    }
  
    function findExpById(id) {
        return db('experiences')
        .where({ id })
        .first();
    
    }
  

    async function addUser(user) {
        const [id] = await db('users').insert(user)

        return findById(id)
    }
    
