var express = require('express');
var request = require('supertest');

var specification_route = require('../routes/specification_route');
require('./setup');

var app = express();
app.use(express.json());
app.use("/", specification_route);

describe('Test for specification route', () => {
    test('should be able to add specification sucessfully ', () => {
        return request(app).post('/specification/insert')
        .send({

            "name":"rajesh" ,
            "category": "Electrician",
            "price": "2500",
            "area": "Purano Baneshwor"
        })
        .then(res => {
            expect(res.statusCode).toBe(201);
        });
    });

    test('should not be able to add specification without location', () => {
        return request(app).post('/specification/insert')
        .send({

            "name":"rajesh" ,
            "category": "Electrician",
            "price": "2500",

        })
        .then(res => {
            expect(res.statusCode).toBe(201);
        });
    });
    
});