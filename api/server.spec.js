const request = require('supertest');

const server = require('./server.js');

const db = require('../data/dbConfig.js')

describe('the server', () => {
    it('should set the testing enviroment', () => {
        const env = process.env.DB_ENV

        expect(env).toBe('testing');
    })
})

describe('GET /', () => {
    it('should return a status of 200', async () => {
        const res = await request(server).get('/');

        expect(res.status).toBe(200);
    })

    it('should return text/HTML', async () => {
        const res = await request(server).get('/');

        expect(res.type).toBe('text/html')
    })

})