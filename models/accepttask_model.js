var mongoose=require('mongoose');
var accepttask = mongoose.model('accepttask',{
    userid : {
        type: String
    },

    descTitle:{
        type:String
    },
   
    description:{
        type:String,
    }, 
    
    time:{
        type:String,
    },
    
    rate:{
        type:String,
    },
    
    date:{
        type:Date,
        default:Date.now
    },

    acceptedby:{
        type:String,
        ref:'user'
    },
});
module.exports = accepttask;