const multer = require ('multer');

const storage = multer.diskStorage({
    destination :function(req,file,cb){
        cb(null,'./public/uploads');
    },
    filename :function(req,file,cb){
        cb(null, Date.now()+file.originalname);
    }
  
});
  // filter for image png jpg file
  const filter =function(req,file,cb){
    if(file.mimetype=='image/png' || file.mimetype=='image/jpeg'|| file.mimetype=='image/jpg'){
        cb(null, true);
    }
    else{
        cb(null, false);
    }

};
const profile = multer({
    storage:storage,
    fileFilter:filter
});

module.exports=profile;