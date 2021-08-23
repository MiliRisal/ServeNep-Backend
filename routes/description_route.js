const express =require('express');
const description = require('../models/description_model');
const auth = require('../middleware/authcheck');
const router = express.Router();

// booking tasker 
router.post('/description/insert', 
 auth.verifyuser,
function(req, res){
    const bookedUserId = req.body.bookedUserId;
    const title = req.body.title;
    const taskDescription= req.body.taskDescription;
    const estimatedTime = req.body.estimatedTime;
    const price = req.body.price;
    const status = req.body.status;
    const addedby=req.userInfo;

    const descriptionData = new description({
        bookedUserId : bookedUserId,
        title: title,
        taskDescription: taskDescription,
        estimatedTime: estimatedTime,
        price: price,
        status : status,
        addedby: addedby

    });
    descriptionData.save()
    .then(function(result){
        res.status(201).json({success:true, message:"Description added Success"});
    }).catch(function(e){
        res.status(500).json({message:e, success:false});
    });
});

//get all boking details
router.get('/description/all', auth.verifyuser, 
 function(req, res){
    description.find().then(function(data){
        res.status(200).json({success: true, data});
    })
    .catch(function(error){
        res.status(500).json({error:error});
   });
});

//get booking details by booking id
router.get('/description/:description_id', auth.verifyuser, 
function(req, res){
    const id = req.params.description_id;
    description.findOne({_id:id}).then(function(result){
        res.status(200).json({success: true, result});
    })
    .catch(function(error){
        res.status(500).json({error:error});
    });
});
router.put('/description/update/:description_id',
// auth.verifyuser,auth.verifyCustomer,
 function(req, res){
    const title = req.body.title;
    const taskDescription= req.body.taskDescription;
    const estimatedTime = req.body.estimatedTime;
    const price = req.body.price;
    const status = req.body.status;
    const id = req.params.description_id;

    description.findOne({_id:id},{
        title: title,
        taskDescription: taskDescription,
        estimatedTime: estimatedTime,
        price: price,
        status : status
    })
    .then(function(result) {
        res.status(200).json({success:true,message: "description Update Success"});
    })
    .catch(function(error){
        res.status(500).json({error:error});
    });

});

router.delete("/description/delete/:description_id",
// auth.verifyuser, 
function(req,res){
    const id =req.params.description_id;
    description.deleteOne({_id:id}).then(function(result){
    res.status(200).json({success:true, message:"description Delete Success"});
}).catch(function (error){
    res.status(500).json({error:error});
});
});

module.exports=router;