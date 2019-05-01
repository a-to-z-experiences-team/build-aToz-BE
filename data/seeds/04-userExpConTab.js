
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('exps_users_attending').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('exps_users_attending').insert([
        {users_id: 1, exp_id: 2},
        {users_id: 1, exp_id: 3},
        {users_id: 2, exp_id: 1},
        {users_id: 3, exp_id: 2},
        {users_id: 3, exp_id: 3},
        {users_id: 4, exp_id: 2},
        {users_id: 4, exp_id: 3},
      ]);
    });
};
