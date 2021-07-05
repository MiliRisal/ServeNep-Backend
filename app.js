const mongoose =require('mongoose');
const express=require('express');
const bodyParser=require('body-parser');
const cors =require('cors');
const bd=require('./database/db');

const user_route = require('./routes/user_route');

const app = express();

app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));

app.use(user_route);

app.listen(90, () => {
    console.log("This server is running at port : 90")
})