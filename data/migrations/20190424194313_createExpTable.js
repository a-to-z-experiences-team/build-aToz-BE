
exports.up = function(knex, Promise) {
    return knex.schema.createTable('experiences', exp => {
      exp.increments();
  
      exp
          .string('exp_title')
          .notNullable()
          .unique();
  
      exp
          .string('exp_desc')
          .notNullable()
  
      exp
          .timestamp('createdAt').default(knex.fn.now());
  
      exp
          .string('location')
          .notNullable()
          .unique();
      exp
          .string('exp_type')
          .unsigned()
          .references('id')
          .inTable('exp_type')
          .onDelete('CASCADE')
          .onUpdate('CASCADE')
  
      exp
          .string('createdBy')
          .unsigned()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')
          .onUpdate('CASCADE')
  
      exp
          .integer('maxGuests')
          .unsigned()
          .notNullable()    
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTableIfExists('experiences');
  };
  