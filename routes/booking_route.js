var express =require('express');
var booking = require('../models/booking_model');
var router = express.Router();

router.post('/booking/insert', function(req, res){
    var userid = req.user;
    var descriptionid = req.description;

    var bookingData = new booking({
userid: userid,
descriptionid: descriptionid,
    });
    bookingData.save()
    .then(function(result){
        res.status(201).json({success:true, message:"booking done Success"});
    }).catch(function(e){
        res.status(500).json({message:e, success:false});
    });
});
router.get('/booking/all', function(req, res){
    booking.find().then(function(data){
        res.status(200).json({data});
    })
    .catch(function(error){
        res.status(500).json({error:error});
    });
});

router.get('/booking/:booking_id:', function(req, res){
    const id = req.params.booking_id;
    booking.findOne({_id:id}).then(function(result){
        res.status(200).json({result});
    })
    .catch(function(error){
        res.status(500).json({error: error});
    });
});

module.exports=router;