var express = require('express');
var request = require('supertest');

var category_route = require('../routes/category_route');
require('./setup');

var app = express();
app.use(express.json());
app.use("/", category_route);

describe('Test for category route', () => {
    test('should be able to add category sucessfully ', () => {
        return request(app).post('/category/insert')
        .send({
            
            "categoryName": "Mechanic",
            "image": "files.jpg",
            
         
        })
        .then(res => {
            expect(res.statusCode).toBe(400);
        });
    });

    test('should not be able to add category without categoryname', () => {
        return request(app).post('/category/insert')
        .send({

            "categoryName": "Mechanic",
 
         

        })
        .then(res => {
            expect(res.statusCode).toBe(400);
        });
    });
    
});