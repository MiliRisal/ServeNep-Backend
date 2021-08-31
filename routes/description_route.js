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
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;
    const addedby=req.body.addedby;

    const descriptionData = new description({
        bookedUserId : bookedUserId,
        title: title,
        taskDescription: taskDescription,
        estimatedTime: estimatedTime,
        price: price,
        latitude: latitude,
        longitude: longitude,
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

//get booking details for user
router.get("/booking/:id", auth.verifyuser, function(req,res){
    const id = req.params.id;
    description.find({addedby:id}).then(
        function(data){
            res.status(200).json({success: true, data});
        }).catch(function(error){
            res.status(500).json({error: error});
        })
});


//get booking details by booking id
router.get('/description/:bookedUserId', auth.verifyuser, 
function(req, res){
    const id = req.params.bookedUserId;
    description.find({bookedUserId:id}).then(function(data){
        res.status(200).json({success: true, data});
    })
    .catch(function(error){
        res.status(500).json({error:error});
    });
});

router.put('/description/update/:description_id',
 auth.verifyuser,
 function(req, res){
    const title = req.body.title;
    const taskDescription= req.body.taskDescription;
    const estimatedTime = req.body.estimatedTime;
    const price = req.body.price;
    const id = req.params.description_id;

    description.updateOne({_id:id},{
        title: title,
        taskDescription: taskDescription,
        estimatedTime: estimatedTime,
        price: price
    })
    .then(function(result) {
        res.status(200).json({success:true,message: "description Update Success"});
    })
    .catch(function(error){
        res.status(500).json({error:error});
    });

});


router.delete("/description/delete/:id", auth.verifyuser, 
function(req,res){
    const id =req.params.id;
    description.deleteOne({_id:id}).then(function(result){
        res.status(200).json({success:true, message:"description Delete Success"});
    }).catch(function (error){
        res.status(500).json({error:error});
    });
});

module.exports=router;