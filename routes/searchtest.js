const app = require('../app');
const supertest = require('supertest')
const request = supertest(app);
const Users = require('../models/users');

var dummyFullUserData = require('../tests/dummyFullData');

beforeAll(async () => {
    await Users.remove({});
    await Users.create(dummyFullUserData);
})

afterAll(async () => {
    await Users.remove({});
})

describe('Search test suit', () => {
    it('Search with **test3** text', async () => {
        const resUsers = await request.get('search/?input=test3');
        console.log(resUsers);
        expect(resUsers.statusCode).toBe(200);
    })
})