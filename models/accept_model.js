var mongoose=require('mongoose');
var accepttask = mongoose.model('accepttask',{
    title:{
        type:String
    },
   
    description:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now

    },
    userid:{
        type:Object,
        ref:'user',
    },
});
module.exports = accepttask;