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
    }
});
module.exports = description;