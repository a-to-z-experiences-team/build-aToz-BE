
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          users_firstName: 'Jenny',
          users_lastName: 'Smith',
          users_userName: 'jsmith01',
          users_email: 'jensmith@gmail.com',
          users_password: 'password'
        },
        {
          users_firstName: 'Karen',
          users_lastName: 'Polov',
          users_userName: 'karryP03',
          users_email: 'kpol@gmail.com',
          users_password: 'password'
        },
        {
          users_firstName: 'Grace',
          users_lastName: 'Crews',
          users_userName: 'gcrew02',
          users_email: 'gracecrew@gmail.com',
          users_password: 'password'
        },
        {
          users_firstName: 'Betty',
          users_lastName: 'Sawyer',
          users_userName: 'betsaw44',
          users_email: 'betsaw@gmail.com',
          users_password: 'password'
        }
      ]);
    });
};

