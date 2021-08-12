var express =require('express');
var accepttask = require('../models/accepttask_model');
var router = express.Router();

router.post('/accept/insert',
 function(req, res){
    var userid=req.userid;
    var title= req.body.title;
    var description= req.body.description;
    var acceptData = new accepttask({
        userid: userid,
        title: title,
        description: description,
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
router.get('/accepttask/:accepttask_id',
// auth.verifyuser, 
function(req, res){
    const id = req.params.accepttask_id;
    accepttask.findOne({_id:id}).then(function(result){
        res.status(200).json({success: true, result});
    })
    .catch(function(error){
        res.status(500).json({error:error});
    });
});
module.exports=router;