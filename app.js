const mongoose =require('mongoose');
const express=require('express');
const bodyParser=require('body-parser');
const cors =require('cors');
const bd=require('./database/db');

const app = express();

app.use(express.json());
app.use(core())

app.listen(90);