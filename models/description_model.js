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
    longitude:{
        type: Number,
    },
    latitude:{
        type: Number,
    },
    addedby:{
        type: String
    }
});
module.exports = description;