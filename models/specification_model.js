var mongoose=require('mongoose');

var specification = mongoose.model('specification',{
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
    },
    area:{
        type:String,
    },
    category:{
        type:String,
        enum : ['Cleaner','Electrician','sweeper','carpenter','Delivery','carpenter','Plumber','Mechanic'],
        required:true,
    },
});
module.exports = specification;