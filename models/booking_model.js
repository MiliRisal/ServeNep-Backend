var mongoose=require('mongoose');
var booking = mongoose.model('booking',{
    userid:{
        type:Object,
        ref:'user',
     },
     descriptionid:{

        type:Object,
        ref:'description'
     },
});
module.exports = booking;