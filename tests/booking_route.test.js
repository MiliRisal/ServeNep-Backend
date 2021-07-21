var express = require('express');
var request = require('supertest');

var booking_route = require('../routes/booking_route');
require('./setup');

var app = express();
app.use(express.json());
app.use("/", booking_route);

describe('Test for booking route', () => {
    test('should be able to booking tasker sucessfully ', () => {
        return request(app).post('/booking/insert')
        .send({

         "userid": require('mongoose').Types.ObjectId("60e3debe8c0ad71584500268"),
         "descriptionid": require('mongoose').Types.ObjectId("60f5bd27eafa5d1010ac6fba"),

        })
        .then(res => {
            expect(res.statusCode).toBe(201);
        });
    });

    test('should not be able to  booking tasker without description id', () => {
        return request(app).post('/description/insert')
        .send({

            "userid": require('mongoose').Types.ObjectId("60e3debe8c0ad71584500268"),

        })
        .then(res => {
            expect(res.statusCode).toBe(400);
        });
    });
    
});