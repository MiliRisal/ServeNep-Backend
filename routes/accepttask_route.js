
const express =require('express');
const accepttask = require('../models/accepttask_model');
const auth = require('../middleware/authcheck');
const router = express.Router();

router.post('/accept/insert',
 function(req, res){
    const userid=req.body.userid;
    const descTitle= req.body.descTitle;
    const description= req.body.description;
    const rate= req.body.rate;
    const time = req.body.time;
    const acceptedby = req.body.acceptedby;

    const acceptData = new accepttask({
        userid: userid,
        descTitle :descTitle,
        rate : rate,
        time : time,
        description: description,
        acceptedby : acceptedby
    });
    acceptData.save()
    .then(function(result){
        res.status(201).json({success:true, message:"task accepted Success"});
    }).catch(function(e){
        res.status(500).json({message:e, success:false});
    });
});
router.get('/accept/all',
// auth.verifyuser
 function(req, res){
    accepttask.find().then(function(data){
        res.status(200).json({success: true, data});
    })
    .catch(function(error){
        res.status(500).json({error:error});
   });
});

//get accepted taskes for user
router.get('/accepttask/user/:userid', auth.verifyuser, function(req, res){
    const userid = req.params.userid;
    accepttask.find({userid:userid}).then(function(data){
        res.status(200).json({success: true, data});
    })
    .catch(function(error){
        res.status(500).json({error:error});
    });
});

//gt accepted taskes for tasker
router.get('/accepttask/tasker/:acceptedby', auth.verifyuser, function(req, res){
    const acceptedby = req.params.acceptedby;
    accepttask.find({acceptedby:acceptedby}).then(function(data){
        res.status(200).json({success: true, data});
    })
    .catch(function(error){
        res.status(500).json({error:error});
    });
});
module.exports=router;