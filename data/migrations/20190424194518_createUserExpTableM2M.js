
exports.up = function(knex, Promise) {
  return knex.schema.createTable('exps_users_attending', tbl => {
      tbl.increments();

      tbl.string('users_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')

      tbl.string('exp_id')
      .unsigned()
      .references('id')
      .inTable('experiences')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('exps_users_attending');
  
};
