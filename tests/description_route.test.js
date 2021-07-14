var express = require('express');
var request = require('supertest');

var description_route = require('../routes/description_route');
require('./setup');

var app = express();
app.use(express.json());
app.use("/", description_route);

describe('Test for description route', () => {
    test('should be able to add description sucessfully ', () => {
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

    test('should not be able to add description without taskdescription', () => {
        return request(app).post('/description/insert')
        .send({

            "title":"claner",
            "estimatedTime":"2",
            "price": "5000",
            "addedby": "user",
        })
        .then(res => {
            expect(res.statusCode).toBe(201);
        });
    });
    
});