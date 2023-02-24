const User=require('../models/user');
const Post=require('../models/post');
module.exports.home=(req,res)=>{
    res.render('home',{
        title:"Alston.com"
    });
}

module.exports.userprofile=(req,res)=>{
    Post.find({},(err,posts)=>{
        if(err){console.log(err)}
        User.findById(req.params.id, function(err, user){
            if(err){console.log("Error in finding user",err);return};
            return res.render('userprofile',{
                title:'Userprofile',
                profile_user: user,
                post:posts
    
            });
        });
    });
    
}