const express =require('express');
const category = require('../models/category_model');
const upload = require('../middleware/Upload');
const router = express.Router();

router.post('/category/insert',upload.single('image'), function(req, res){
    if(req.file==undefined){
        return res.status(400).json({
        message:"jpg and png format allowed"});
    }
    const categoryName =req.body.categoryName;
    const image =req.file.path;

    const categoryData = new category({
        categoryName: categoryName,
        image: image,
    });
    categoryData.save()
.then(function(result){
    res.status(201).json({success:true, message:"Image Insert Success"});
}).catch(function(error){
    res.status(500).json({message:error, success:false});
});

});
//get all category information
router.get('/category/all', function(req, res){
    category.find().then(function(data){
        res.status(200).json({data});
    })
    .catch(function(error){
        res.status(500).json({error:error});
    });
});
// get single category information
router.get('/category/:category_id', function(req, res){
    const id =req.params.category_id;
    category.findOne({_id:id}).then(function(result){
        res.status(200).json(result);
    })
    .catch(function(err){
        res.status(500).json({error:err});
    });


});
router.delete('/image/delete/:category_id',function(req, res){
    const id =req.params.category_id;
    category.deleteOne({_id:id}).then(function(result){
        res.status(200).json({message:" category delete success",success:true});
    })
.catch(function(error){
    res.status(500).json({error:error});
});
});
module.exports =router;