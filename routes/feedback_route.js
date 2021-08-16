const express =require('express');
const feedback = require('../models/feedback_model');
const router = express.Router();

router.post('/feedback/insert', function (req, res){
  
    const description = req.body.description;
    const title = req.body.title;

    const feedbackdata = new feedback({
    
        description: description,
        title: title,
    });
    feedbackdata.save()
    .then(function(result){
        res.status(201).json({success: true, message:"feedback added Success"});
    }).catch(function(e){
        res.status(500).json({message:e, success:false});

    });
});

router.get('/feedback/all', function (req, res){
    feedback.find().then(function(data){
        res.status(200).json({success: true, data});
    })
    .catch(function(e){
        res.status(500).json({error: e});
    });
});

router.get('/feedback/single/:feedback_id:', function (req, res){
    const id = req.params.feedback_id;
    feedback.findOne({_id: id}).then (function(data){
        res.status(200).json({data});
    })
    .catch(function(e){
        res.status(500).json({error:e});
    });
});
router.delete('/feedback/delete/:feedback_id', function (req, res){
    const id = req.params.feedback_id;

    feedback.deleteOne({_id:id}).then(function(result){
        res.status(200).json({success: true, message:"feedback deleted Success"});
    })
    .catch(function(e){
        res.status(500).json({error: e});
    });
});


module.exports =router;