const Post=require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comments');


//Main page
module.exports.alstonpage= async(req,res)=>{
    try {
        let users = await User.find({});
        let comment = await Comment.find({}).populate('user').sort('-createdAt');
        //.populate('user') use for send post user data like a send full user
        let post = await Post.find({})
        // .populate('user comments').sort('-createdAt');//.sort('-createdAt') for when i upload use for sort a img upload time new post show on top.
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        return res.render('alstonpage', {
            title: "Alston-Page",
            all_user: users,
            posts: post,
            
        });
    }catch(err){
        console.log("Error",err);
        return;
    }

}


// Singup page
module.exports.singup = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect("/user/alstonpage");
    }
    return res.render('singup', {
        title: "Singup"
    });
}

//Create user in mongoose
module.exports.createuser = (req, res) => {
    if (req.body.password != req.body.Conformpassword) {
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) { console.log("Error in findin user ", err); return }
        if (!user) {
            User.create(req.body, (err, user) => {
                if (err) { console.log("Error in creating user in mongoose "); return }
                return res.redirect('/')
            })
        }
        else {
            res.redirect('back')
        }
    });
}

//Login user
module.exports.loginuser = (req, res) => {
    req.flash('success','Logged-In-Successfully');
    return res.redirect('/user/alstonpage');
}

// SingOut
module.exports.singout=(req,res)=>{
    req.logout(function (err) {
        if(err){return next(err)}
        req.flash('success','You have logged out!');
        return res.redirect('/');
    });
}