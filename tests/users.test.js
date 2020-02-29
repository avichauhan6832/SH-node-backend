const app = require('../app');
const request = require('supertest');
const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017/userProfile-test';
const connect = mongoose.connect(url);

var data = require('./dummyData');

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });



test('Create a new user', async () => {
    await request(app).post('/users').send(data).then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    })
    .expect(200)
})
