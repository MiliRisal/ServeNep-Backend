const express = require('express');
const user= require('../models/user_model');
const router = express.Router();
const bcryptjs=require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/authcheck');
const { json } = require('express');
const {check,validationResult} = require('express-validator');


//........Insert................
router.post('/user/insert',[
    check('email',"User email is required!").not().isEmpty(),
    check('password',"User password is required!").not().isEmpty(),
],
function(req, res){
    const ValidationError = validationResult(req);
    if (ValidationError.isEmpty()) {
const fullName=req.body.fullName;
const phone=req.body.phone;
const email=req.body.email;
const address=req.body.address;
const role=req.body.role;
const password=req.body.password;

bcryptjs.hash(password,10,function(err,password){
    const data = new user({
        fullName:fullName,
        phone:phone,
        email:email,
        address:address,
        role:role,
        password:password,});

        data
        .save()
        .then(function(result){
            res.status(201).json({
                success: true,
                token: null,
              });
        })
        .catch((error) =>
        res.json({ message: error.message, success: false })
        );

});

} else{
    console.log(validationErr.array());
      res.status(400).json(validationErr.array());
}
});

//...... user login
router.post('/user/login', function(req, res){
    const email=req.body.email;
    const password=req.body.password; // sent from user

// find single Specific user information
user.findOne({email: email})
.then(function(userdata){
    if (userdata===null) {
        return res.status(403).json({
            message: "Login Fail!!!"
        })
    }
      // username found
      bcryptjs.compare(password, userdata.password, function (error, res1) {
        if (res1 === false) {

            return res.status(403).json({
                message: " Invalid Userdetail!!!"
            })
        }
        const token = jwt.sign({    //  username and password is valid //token generate
            userId: userdata._id
        }, 'secretkey')
        res.status(200).json({
            token: token,
            success: true,
            role:userdata.role
            
        })

    })

}).catch(function (e) {
    res.status(500).json({Error: e});
})
});

//......... get all user 
router.get('/user/all',function(req,res){
    user.find()
    .then(function(data){
        res.status(200).json(data);
    })
    .catch(function(err){
        res.status(500).json({error:err})
    })
});
   // get Single user...........
   router.get("/user/:user_id", function(req, res) {
    const id = req.params.user_id;
    user.findOne({_id:id}).then (function(result){
        res.status(200).json(result);
    })
    .catch(function(er){
    res.status(200) .json({error:er})
    })

});

//............search by name
router.get('/search/:fullName', function(req, res){
    var name = new RegExp(req.params.fullName,'i');
    user.find({fullName:name }) 
    .then((result)=>{
        res.status(200).json(result)

    })
});

module.exports = router;