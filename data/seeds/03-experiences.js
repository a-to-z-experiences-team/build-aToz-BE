
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('experiences').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('experiences').insert([
        {
          exp_title: 'Hiking in Pasa',
          exp_desc: 'we are taking a hike up to Eaton Canyon Park in Pasadena come join us',
          createdAt: '2019 May 01',
          startsOn: '2019 May 05',
          location: 'Pasadena',
          exp_type: 1,
          createdBy: 2,
          maxGuests: 4
        },

        {
          exp_title: 'Treasure Hunt',
          exp_desc: 'getting ready for new pirates theme park so come join us as we run around gathering clues to dig up treaure outfits and costume encouraged',
          createdAt: '2019 April 13',
          startsOn: '2019 April 24',
          location: 'New York',
          exp_type: 2,
          createdBy: 1,
          maxGuests: 17
        },    

        {
          exp_title: 'Walking Around the park',
          exp_desc: 'need some time to take a stroll come join us as we walk around Central Park for some fresh air for us and the kids',
          createdAt: '2019 June 25',
          startsOn: '2019 July 10',
          location: 'New York',
          exp_type: 1,
          createdBy: 1,
          maxGuests: 15
        },
      ]);
    });
};