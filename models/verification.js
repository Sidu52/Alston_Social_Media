const mongoose=require('mongoose');

const verification=new mongoose.Schema({
    name:String,
    email:String,
    password:Number,
    OTP:Number,
    tokenExpiry:Number  
},{
    timestamps:true
})

const verificationOTP=mongoose.model('OTP',verification);
module.exports=verificationOTP;