const knex = require('knex');

const dbConfig = require('../knexfile.js');

const db = knex(dbConfig.development);

module.exports = {
    findExpereinces,
    addUser,
    findById
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
    
    function findById(id) {
        return db('users')
        .where({ id })
        .first();
    }
  
    async function addUser(user) {
        const [id] = await db('users').insert(user)

        return findById(id)
    }
    
