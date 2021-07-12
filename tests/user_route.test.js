var express = require('express');
var request = require('supertest');

var user_route = require('../routes/user_route');
require('./setup');

var app = express();
app.use(express.json());
app.use("/", user_route);

describe('Test for user route', () => {
    test('should be able to register a user', () => {
        return request(app).post('/user/insert')
        .send({
            "fullName":"kiran Gautam",
            "phone": "980898989",
            "address": "Maitidevi, Kathmandu",
            "email": "gautamkiran38@gmail.com",
             "role": "Customer",
             "password": "password"
        })
        .then(res => {
            expect(res.statusCode).toBe(201);
        });
    });

    test('should not be able to register a user without a phone no', () => {
        return request(app).post('/user/insert')
        .send({
            "fullName":"kiran Gautam",
            "address": "Maitidevi, Kathmandu",
            "email": "gautamkiran38@gmail.com",
             "role": "Customer",
             "password": "password"
        })
        .then(res => {
            expect(res.statusCode).toBe(400);
        });
    });

    
});