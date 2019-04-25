
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', users => {
      users.increments();
  
      users
          .string('users_firstName')
          .notNullable();
  
      users
          .string('users_lastName')
          .notNullable();
      
      users
          .string('users_userName')
          .notNullable()
          .unique();
  
      users
          .string('users_password')
          .notNullable();
      users.timestamp('createdAt').defaultTo(knex.fn.now());
    })
  
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
  };
  