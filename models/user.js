const mongoose=require('mongoose');
const multer = require('multer');
const path =require('path');
const AVATAR_PATH = path.join ('/uploads/users/avatars');

const user=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar: {
        type:String
    }
},{
    timestamps:true
});


const storage = multer.diskStorage(
    {
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "." + file.mimetype.split('/')[1];
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  }
);

//static method
user.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
user.statics.avatarPath = AVATAR_PATH;

const User=mongoose.model('User',user);
module.exports=User;