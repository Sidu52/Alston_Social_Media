const User = require('../models/user');
const Post = require('../models/post');
const OTP = require('../models/verification');
const emailverification = require('../mailers/emailverifed');

module.exports.home = (req, res) => {
    res.render('home', {
        title: "Alston.com"
    });
}

module.exports.userprofile = (req, res) => {
    Post.find({}, (err, posts) => {
        if (err) { console.log(err) }
        User.findById(req.params.id, function (err, user) {
            if (err) { console.log("Error in finding user", err); return };
            return res.render('userprofile', {
                title: 'Userprofile',
                profile_user: user,
                post: posts

            });
        });
    });

}

module.exports.emailverification = async (req, res) => {
    if (req.body.password != req.body.Conformpassword) {
        return res.redirect('back');
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiresAt = Date.now() + 120000;

    try {
        OTP.findOne({ email: req.body.email }, (err, users) => {
            if (!users) {
                let user = OTP.create({
                    name: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    OTP: otp,
                    tokenExpiry: otpExpiresAt,
                }).then(forgotpassword => {
                    forgotpassword.save();
                    emailverification.verification(result.email, otp);
                    return res.render('otpverification', {
                        title: "Email-veification",
                        user: result
                    })
                }).catch(err => {
                    console.log("Error in creating Forgotpassword document!", err);
                });

            } else {
                let user = OTP.findByIdAndUpdate({ _id: users.id }, {
                    OTP: otp,
                    tokenExpiry: otpExpiresAt,
                }).then((result) => {
                    emailverification.verification(result.email, otp);
                    return res.render('otpverification', {
                        title: "Email-veification",
                        user: result
                    })

                }).catch((error) => {
                    console.log(error);
                });
            }

        })

    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal server error');
    }

}