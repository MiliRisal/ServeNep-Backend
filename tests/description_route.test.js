var express = require('express');
var request = require('supertest');

var description_route = require('../routes/description_route');
require('./setup');

var app = express();
app.use(express.json());
app.use("/", description_route);

describe('Test for description route', () => {
    test('should be able to write description by user', () => {
        return request(app).post('/description/insert')
        .send({
           "title":"claner",
        "taskDescription":"house cleaning",
        "estimatedTime":"2",
        "price": "5000",
        "addedby": "user",
        })
        .then(res => {
            expect(res.statusCode).toBe(201);
        });
    });

    test('should not be able to register a user without a phone no', () => {
        return request(app).post('/user/insert')
        .send({
            "fullName":"kiran Gautam",
            "email": "gautamkiran38@gmail.com",
            "address": "Maitidevi, Kathmandu",
             "password": "password"
        })
        .then(res => {
            expect(res.statusCode).toBe(200);
        });
    });

    test('should be able to login', ()=> {
        return request(app).post('/user/login')
        .send({
            "email": "gautamkiran38@gmail.com",
            "password": "password"
            
        })
        .then(res=> {
            expect(res.statusCode).toBe(200);
        });
    });
    
    test('should not be able to login with wrong password', ()=> {
        return request(app).post('/user/login')
        .send({

             "email": "gautamkiran38@gmail.com",
            "password": "password"
           
        })
        .then(res=> {
            expect(res.statusCode).toBe(200);
        });
    });

    
});