var mongoose =require('mongoose');
var express=require('express');
var bodyParser=require('body-parser');
var cors =require('cors');

var bd = require('./database/db');

var user_route = require('./routes/user_route');
var description_route = require('./routes/description_route');
var booking = require('./routes/booking_route');
var category = require('./routes/category_route');
var notification = require('./routes/notification_route');
var accepttask= require('./routes/accepttask_route');
var feedback = require('./routes/feedback_route');

var app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));

app.use(user_route);
app.use(description_route);
app.use(booking);
app.use(category);
app.use(notification);

app.use(express.static('public'))
app.use(accepttask);
app.use(feedback);
app.listen(90, () => {
    console.log("This server is running at port : 90");
});