
exports.up = function(knex, Promise) {
    return knex.schema.createTable('exp_type', type => {
        type.increments();
  
        type
          .string('exp_type')
          .notNullable()
          .unique();
    })
  };
  
  exports.down = function(knex, Promise) {
    
  };
  