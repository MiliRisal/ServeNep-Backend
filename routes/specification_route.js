var express =require('express');
var specification = require('../models/specification_model');
var auth = require('../middleware/authcheck');
const router = express.Router();

router.post('/specification/insert',
// authcheck.verifyuser,authcheck.verifyTasker,
function(req, res){
    var name = req.body.name;
    var category = req.body.category;
    var price = req.body.price;
    var area = req.body.area;
var specificationData = new specification({
name: name,
category: category,
price: price,
area: area,
});
specificationData.save()
.then(function(result){
    res.status(201).json({success:true, message:"specification added Success"});
}).catch(function(e){
    res.status(500).json({message:e, success:false});

});
});
router.get('/specification/all',
// authcheck.verifyuser, 
function(req, res){
    specification.find().then(function(data){
        res.status(200).json({data});
    })
    .catch(function(error){
        res.status(500).json({error:error});
   });
});

router.get('/specification/:specification_id:',
// authcheck.verifyuser, 
function(req, res){
    const id = req.params.specification_id;
    specification.findOne({_id:id}).then(function(result){
        res.status(200).json(result);
    })
    .catch(function(error){
        res.status(500).json({error:error});
    });
});
//............search by name
router.get('/search/:category', function(req, res){
    var category = new RegExp(req.params.category,'i');
    specification.find({category:category }) 
    .then((result)=>{
        res.status(200).json(result)

    })
});

module.exports=router;