var mongoose=require('mongoose');
var feedback = mongoose.model('feedback',{
    userid:{
        type:Object,
        ref:'user',
     },
     description:{

        type:String
        
     },
});
module.exports = feedback;