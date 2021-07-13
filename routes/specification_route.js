var express =require('express');
var specification = require('../models/specification_model');
const router = require('./description_route');
route = express.Router();

router.post('/specification/insert',function(req, res){
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
router.get('/specification/all', function(req, res){
    specification.find().then(function(data){
        res.status(200).json({data});
    })
    .catch(function(error){
        res.status(500).json({error:error});
   });
});

router.get('/specification/:specification_id:', function(req, res){
    const id = req.params.specification_id;
    specification.findOne({_id:id}).then(function(result){
        res.status(200).json(result);
    })
    .catch(function(error){
        res.status(500).json({error:error});
    });
});

module.exports=router;