const mongoose=require('mongoose');
const feedback = mongoose.model('feedback',{

    Title:{
        type:String,
    },

     description:{
     type:String
        
     }
});
module.exports = feedback;