
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('exp_type').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('exp_type').insert([
        {exp_type: 'outdoors'},
        {exp_type: 'recreational'},
        {exp_type: 'indoors'},
      ]);
    });
};
