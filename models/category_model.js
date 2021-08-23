var mongoose=require('mongoose');
var category = mongoose.model('category',{
   categoryName:{
      type:String, 
   },
   categoryDesc:{
      type:String, 
   },
   image:{
      type:String,
      trim:true
   }
});
module.exports = category;