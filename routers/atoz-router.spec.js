const atoz = require('../data/dbHelpers.js');

const db = require('../data/dbConfig.js');

describe('the main endpoints', () => {
    describe('the users functions', () => {

        beforeEach(()=> {
            return db('users').truncate();
        })


        it('should insert a user into the db', async () => {
            await db('users').insert([{
                users_firstName: 'Jenny',
                users_lastName: 'Smith',
                users_userName: 'jsmith01',
                users_email: 'jensmith@gmail.com',
                users_password: 'password'
            }])

            const user = await db('users');
            expect(user.length).toBe(1);
            expect(user[0].users_lastName).toBe('Smith');
        })

        it('should return all users in db', async () => {
                const user = await atoz.getAllUsers();
                expect(user.length).toBe(3);
        })
    })




// ------- exp tests ------------
    describe('the insert exp function', () => {
        beforeEach(()=> {
            return db('experiences').truncate();
        })

        it('should insert an experiences', async () => {
            await db('experiences').insert([{
                exp_title: 'My TEST',
                exp_desc: 'come test with me!!!',
                createdAt: '2019 April 13',
                startsOn: '2019 April 24',
                location: 'New York',
                maxGuests: 17
            }])

            const allevents = await db('experiences');
            // console.log(allevents)
            expect(allevents.length).toBe(1)
            // expect(event.maxGuests).toBe(17);
            
        })
        
        it('should get all events', async () => {

            await db('experiences').insert([
                {
                    exp_title: 'My TEST',
                    exp_desc: 'come test with me!!!',
                    createdAt: '2019 April 13',
                    startsOn: '2019 April 24',
                    location: 'New York',
                    maxGuests: 17
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
            ])

            const allevents = await db('experiences');
            expect(allevents.length).toBe(3)
            expect(allevents[2].exp_title).toBe('Walking Around the park')
        })

    })
})