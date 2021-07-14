var mongoose=require('mongoose');

var description = mongoose.model('description',{
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
});
module.exports = description;