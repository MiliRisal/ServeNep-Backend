var express =require('express');
var booking = require('../models/booking_model');
var router = express.Router();

router.post('/booking/insert', function(req, res){
    var userid = req.user;
    var descriptionid = req.description;

    var booking = new booking({
userid: userid,
descriptionid: descriptionid,
    });
    booking.save()
    .then(function(result){
        res.status(201).json({success:true, message:"booking done Success"});
    }).catch(function(e){
        res.status(500).json({message:e, success:false});
    });
});


module.exports=router;