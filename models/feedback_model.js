const mongoose=require('mongoose');

const feedback = mongoose.model('feedback',{

    feedtitle:{
        type:String,
    },

    feeddescription:{
        type:String
    }
});
module.exports = feedback;