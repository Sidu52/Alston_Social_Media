const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comments');
const otp = require('../models/verification');
const emailverification = require('../mailers/emailverifed');

//Main page
module.exports.alstonpage = async (req, res) => {
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
    } catch (err) {
        console.log("Error", err);
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
module.exports.createuser = async (req, res) => {
    let user = await otp.findById(req.params.id);
    if (user.OTP == req.body.OTP) {
        User.findOne({ email: user.email }, (err, finduser) => {
            if (err) { console.log("Error in findin user ", err); return }
            if (!finduser) {
                User.create({
                    name: user.name,
                    email: user.email,
                    password: user.password
                }, (err, user) => {
                    if (err) { console.log("Error in creating user in mongoose "); return }
                    req.flash("success", "User register successful")
                    return res.redirect('/')
                })
            }
            else {
                req.flash("success", "User Already register")
                return res.redirect('/');
            }
        });
    } else {
        req.flash("error", "Wron OTP");
        return res.redirect('/user/singup');

    }
}

//Login user
module.exports.loginuser = (req, res) => {
    req.flash('success', 'Logged-In-Successfully');
    return res.redirect('/user/alstonpage');
}
//Reals video
module.exports.reals = async (req, res, next) => {
    try {
        let users = await User.find({});
        const posts = await Post.find({}).populate('user').sort('-createdAt');
        return res.render('reals', {
            title: "Reals",
            post: posts,
            user:users
        });
    } catch (err) {
        next(err);
    }
};

// SingOut
module.exports.singout = (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err) }
        req.flash('success', 'You have logged out!');
        return res.redirect('/');
    });
}