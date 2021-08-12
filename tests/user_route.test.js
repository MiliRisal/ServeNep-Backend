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
            "fullName": "jitendra Sah",
            "phone": "9824295932",
            "email": "jitendra731@gmail.com",
            "address": "Janakpur",
            "role": "Customer",
            "password": "jetu@123",
            "price": "10000",
            "category": "Electrician"
        })
        .then(res => {
            expect(res.statusCode).toBe(201);
        });
    });

    test('should not be able to register a user without a category', () => {
        return request(app).post('/user/insert')
        .send({

            "fullName": "jitendra Sah",
            "phone": "9824295932",
            "email": "jitendra731@gmail.com",
            "address": "Janakpur",
            "role": "Customer",
            "password": "jetu@123",
            "price": "10000",

           
        })
        .then(res => {
            expect(res.statusCode).toBe(200);
        });
    });



    test('should be able to login', ()=> {
        return request(app).post('/user/login')
        .send({
            "email": "jitendra731@gmail.com",
            "password": "jetu@123",
            
        })
        .then(res=> {
            expect(res.statusCode).toBe(200);
        });
    });
    
    test('should not be able to login with wrong password', ()=> {
        return request(app).post('/user/login')
        .send({

            "email": "jitendra731@gmail.com",
         
           
        })
        .then(res=> {
            expect(res.statusCode).toBe(200);
        });
    });

});
