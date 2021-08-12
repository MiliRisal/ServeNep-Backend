const express = require('express');
const user = require('../models/user_model');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/authcheck');
const { json } = require('express');
const { check, validationResult } = require('express-validator');
const profile = require('../middleware/profile');

//........Insert................
router.post('/user/insert', [
    check('fullName', "full Name is required!").not().isEmpty(),
    check('email', "User email is required!").not().isEmpty(),
    check('password', "User password is required!").not().isEmpty(),
    check('phone', "Phone number is required!").not().isEmpty(),
    check('role', "User Role is required!").not().isEmpty(),
],
    function (req, res) {
        const ValidationError = validationResult(req);
        if (ValidationError.isEmpty()) {
            const fullName = req.body.fullName;
            const phone = req.body.phone;
            const email = req.body.email;
            const address = req.body.address;
            const role = req.body.role;
            const password = req.body.password;
            const price = req.body.price;
            const category = req.body.category;

            user.findOne({ email: email })
                .then((savedUser) => {
                    if (savedUser) {
                        return res.status(422).json({ message: "User already exists with this email" });
                    }

                    bcryptjs.hash(password, 10, function (err, password) {
                        const data = new user({
                            fullName: fullName,
                            phone: phone,
                            email: email,
                            address: address,
                            role: role,
                            password: password,
                            price: price,
                            category: category,

                        });

                        data.save()
                            .then(function (result) {
                                res.status(201).json({
                                    success: true,
                                    message: "You have registered successfully!"
                                });
                            })
                            .catch(error => {
                                res.json({ message: error.message, success: false });
                            });
                    });
                })
                .catch(err => {
                    console.log(err);
                });

        } else {
            console.log(ValidationError.array());
            res.status(400).json(ValidationError.array());
        }
    });

//...... user login
router.post('/user/login', function (req, res) {
    const email = req.body.email;
    const password = req.body.password; // sent from user

    // find single Specific user information
    user.findOne({ email: email })
        .then(function (userdata) {
            if (userdata === null) {
                return res.status(403).json({
                    message: "Login Fail!!!"
                });
            }
            // username found
            bcryptjs.compare(password, userdata.password, function (error, res1) {
                if (res1 === false) {

                    return res.status(403).json({
                        message: " Invalid Userdetail!!!"
                    });
                }
                const token = jwt.sign({    //  username and password is valid //token generate
                    userId: userdata._id
                }, 'secretkey');
                res.status(200).json({
                    token: token,
                    success: true,
                    role: userdata.role

                });

            });

        }).catch(function (e) {
            res.status(500).json({ Error: e });
        });
});

//get user: my profile
router.get("/user/me", auth.verifyuser, async (req,res)=>{
    try{
    const user1= await user.findOne(req.userInfo._id) 
    res.status(200).json({success:true, data:user1});  
    }
    catch(e){
       
    }
})

//......... get all user 
router.get('/user/all', function (req, res) {
    user.find()
        .then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (err) {
            res.status(500).json({ error: err });
        });
});
// get Single user...........
router.get("/user/:user_id", function (req, res) {
    const id = req.params.user_id;
    user.findOne({ _id: id }).then(function (result) {
        res.status(200).json(result);
    })
        .catch(function (er) {
            res.status(200).json({ error: er });
        });

});

//............search by name
router.get('/search/:fullName', function (req, res) {
    var name = new RegExp(req.params.fullName, 'i');
    user.find({ fullName: name })
        .then((result) => {
            res.status(200).json(result);

        });
});

router.put('/user/update/:userid', auth.verifyuser, function (req, res) {
    const fullName = req.body.fullName;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;
    const price = req.body.price;
    const category = req.body.category;
    const id = req.body.userid;

    user.updateOne({ _id: id }, {
        fullName: fullName,
        email: email,
        phone: phone,
        address: address,
        price: price,
        category: category,
    })
        .then(function (result) {
            res.status(200).json({ success: true, message: "user specification added successful" });

        })
        .catch(function (e) {
            res.status(500).json({ error: e });
        });
});

 //this filters taskers according to category
 router.get("/tasker/:category", auth.verifyuser, function(req,res){
    const category = req.params.category;
    user.find({category:category}).exec(function(error, data){
        res.status(200).json({success : true,count: data.length, data});
    });
});

   // image upload for user
   router.put("/user/profile/:id",profile.single("profileImage"), async function(req, res){
       if (req.file!==undefined){
           try {
               const image =await user.findOneAndUpdate({_id:req.params.id},{$set:{profileImage:req.file.filename}} ,{new :true , 
                res:status(200).json({success: true,message:"image saved successfully",image:profileImage})});
           } catch (error) {
               res.status(500).json({error:error});
               
           }
       }
   });

module.exports = router;