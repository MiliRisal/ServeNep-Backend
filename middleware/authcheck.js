const jwt = require('jsonwebtoken');
const User=require('../models/user_model');


// main ..................guard
module.exports.verifyuser = async function(req, res, next) {

    try {
        const token =req.headers.authorization.split(" ")[1]; //token fetch and split
        const data1 = jwt.verify(token, 'secretkey');
        // we have id only
       // console.log(data.customerdata._id)
       await User.findOne({_id:data1.userId})
        .then (result => {
            req.userInfo = result;   // all information about the user (username, password, usertype)
            next();

        })
        .catch(function(e){
            res.status(401).json({error : e});
        });

    }
    catch(e) {
        res.status(401).json({error: e});
    }
}

// second...............guard for admin
module.exports.verifyTasker = function(req,res,next) {
    if(!req.userInfo) {
        return res.status(401).json({message : "invalid Users!"});
    }
    else if(req.userInfo.role !=='Tasker'){
        return req.status(401).json({message : "Unauthorized!!"});

    }
    next();

}

// guard for customer .................
module.exports.verifyCustomer = function(req,res,next) {
    if(!req.userInfo) {
        return res.status(401).json({message : "invalid Users!"});
    }
    else if(req.userInfo.role !=='Customer'){
        return req.status(401).json({message : "Unauthorized!!"});

    }
    next();
};
