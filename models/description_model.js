var mongoose=require('mongoose');

var description = mongoose.model('description',{
    bookedUserId:{
        type: String
    },
    title:{
        type:String,
        require:true
    },
    taskDescription:{
        type:String,
    },
    estimatedTime:{
        type:String,
    },
    price:{
        type:String,
    },
    addedby:{
        type: Object,
        ref:'user',
    },
    status:{
        type: String
    }
});
module.exports = description;