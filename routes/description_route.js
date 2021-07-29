var express =require('express');
var description = require('../models/description_model');
var auth = require('../middleware/authcheck');
var router = express.Router();

router.post('/description/insert',auth.verifyuser,auth.verifyCustomer, function(req, res){
    var title = req.body.title;
    var taskDescription= req.body.taskDescription;
    var  estimatedTime = req.body.estimatedTime;
    var price = req.body.price;
    var addedby=req.user;

    var descriptionData = new description({
        title: title,
        taskDescription: taskDescription,
        estimatedTime: estimatedTime,
        price: price,
        addedby: addedby,

    });
    descriptionData.save()
    .then(function(result){
        res.status(201).json({success:true, message:"Description added Success"});
    }).catch(function(e){
        res.status(500).json({message:e, success:false});
    });
});

router.get('/description/all',auth.verifyuser, function(req, res){
    description.find().then(function(data){
        res.status(200).json({success: true, data});
    })
    .catch(function(error){
        res.status(500).json({error:error});
   });
});

router.get('/description/:description_id',auth.verifyuser, function(req, res){
    const id = req.params.description_id;
    description.findOne({_id:id}).then(function(result){
        res.status(200).json({success: true, result});
    })
    .catch(function(error){
        res.status(500).json({error:error});
    });
});
router.put('/description/update/:description_id',auth.verifyuser,auth.verifyCustomer, function(req, res){
    var title = req.body.title;
    var taskDescription= req.body.taskDescription;
    var  estimatedTime = req.body.estimatedTime;
    var price = req.body.price;
    const id=req.params.description_id;

    description.findOne({_id:id},{
        title: title,
        taskDescription: taskDescription,
        estimatedTime: estimatedTime,
        price: price,
    })
    .then(function(result) {
        res.status(200).json({success:true,message: " description Update Success"});
    })
    .catch(function(error){
        res.status(500).json({error:error});
    });

});

router.delete("/description/delete/:description_id",auth.verifyuser, function(req,res){
    const id =req.params.description_id;
    description.deleteOne({_id:id}).then(function(result){
    res.status(200).json({success:true, message:"description Delete Success"});
}).catch(function (error){
    res.status(500).json({error:error});
});
});

module.exports=router;