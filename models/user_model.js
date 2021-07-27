const mongoose=require('mongoose');

const user = mongoose.model('user',{
    fullName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    phone:{
        type:String,
        required:true,
        min:9,
        max:10,
    },
    address:{
        type:String,
    },
    password:{
        type:String,
        require:true,
    },
    role:{
        type:String,
        enum : ['Tasker','Customer'],
        default : 'Customer'
    },
});
module.exports = user;