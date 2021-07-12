var express =require('express');
var description = require('../models/description_models');
var router = express.Router();

router.post('/description/insert', function(req, res){
    var title = req.body.title;
    var taskDescription= req.body.taskDescription;
    var  estimatedTime = req.body.estimatedTime;
    var price = req.body.price;

    var descriptionData = new description({
        title: title,
        taskDescription: taskDescription,
        estimatedTime: estimatedTime,
        price: price,

    });
    descriptionData.save()
    .then(function(result){
        res.status(201).json({success:true, message:"Description Insert Success"});
    }).catch(function(e){
        res.status(500).json({message:e, success:false});
    });
});

module.exports=router;