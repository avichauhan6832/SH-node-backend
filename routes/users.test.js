const app = require('../app');
// const mongoose = require('mongoose');
const supertest = require('supertest')
const request = supertest(app);
const Users = require('../models/users');

var dummyFullUserData = require('../tests/dummyFullData');
var dummySemiUserData = require('../tests/dummySemiData');
var dummyEmptyUserData = require('../tests/dummyEmptyData');


beforeAll(async () => {
    await Users.remove({});
})

afterAll(async () => {
    await Users.remove({});
})

describe('Sample Test with mongo connection', () => {
    it('Insert Full User into Database successfully!', async () => {
        const newUser = await request.post('/users').send(dummyFullUserData);
         //console.log(newUser);
        expect(newUser.statusCode).toBe(200);
        expect(newUser.body).toHaveProperty("_id");
    });

    it('Insert Semi User into Database successfully!', async () => {
        const newUser = await request.post('/users').send(dummySemiUserData);
        // console.log(newUser);
        expect(newUser.statusCode).toBe(200);
        expect(newUser.body).toHaveProperty("_id");
    })

    it('Insert User with Invalid Field --here duplicate email ', async () => {
        const newUser = await request.post('/users').send(dummyFullUserData);
        // console.log(newUser);
        expect(newUser.statusCode).not.toBe(200);
    })

    it('Insert User without Required Field --here without email ', async () => {
        const newUser = await request.post('/users').send(dummyEmptyUserData);
        // console.log(newUser);
        expect(newUser.statusCode).not.toBe(200);
    })

  })

describe('Search test suit', () => {
    it('Search with **test3** text', async () => {
        const resUsers = await request.get('/search/?input=test3');
        console.log(resUsers);
        expect(resUsers.statusCode).toBe(200);
    })
})