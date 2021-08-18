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
<<<<<<< HEAD:models/accepttask_model.js
=======

>>>>>>> 3165aba1c1da3a7f70d25dbd821eb29f75fc90e6:models/accept_model.js
    },
    userid:{
        type:Object,
        ref:'user',
    },
});
module.exports = accepttask;