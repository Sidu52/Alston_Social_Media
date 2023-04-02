const User = require('../models/user');
const Resetpassword = require('../models/forgotpassword');
const Post = require('../models/post');
const crypto = require('crypto')
const forgotpasswordmailer = require('../mailers/forgotpassword');
// Forget Passwoed page for perform sendingmail
module.exports.sendmail = (req, res) => {
    return res.render('sendmail', {
        title: "Reset-password"
    });
}
//Send on user email id for forgot password

module.exports.sendemail = async (req, res) => {
    try {
        let user = await User.findOne({
            email: req.body.email
        });
        if (user) {
            crypto.randomBytes(48, function (err, buffer) {
                let token = buffer.toString('hex');
                Resetpassword.findOne({ email: req.body.email }, (err, users) => {
                    if (!users) {
                        Resetpassword.create({
                            email: req.body.email,
                            resetToken: token,
                            tokenExpiry: Date.now() + 120000,
                            user: user.id
                        }).then(forgotpassword => {
                            forgotpassword.save();
                        }).catch(err => {
                            console.log("Error in creating Forgotpassword document!", err);
                        });
                    } else {

                        Resetpassword.findByIdAndUpdate({ _id: users.id }, {
                            resetToken: token,
                            tokenExpiry: Date.now() + 120000,
                        }).then((result) => {

                        }).catch((error) => {
                            console.log(error);
                        });
                    }
                    forgotpasswordmailer.newPassword(users);
                })
            })
        }
        return res.redirect('back')
    } catch (err) {
        console.log("Error in finding User!", err)
        return res.redirect('back');
    }
}


//Reset password
module.exports.resetpasswoerd = async (req, res) => {
    try {
        let user = await Resetpassword.findById(req.params.id);
        const tokenExpiration = user.tokenExpiry;
        if (new Date() > tokenExpiration) {
            req.flash('error', 'Link has expired');
            res.redirect('/')
            return;
        }
        let mainuser = await User.findById(user.user);
        res.render('mailers/passwordchange/resetpass', {
            title: "Reset Password",
            user: mainuser
        });
    } catch (err) {
        console.log(err);
        res.redirect('back');
    }
}

//Changed user passwoerd in database
module.exports.createnewpassword = async (req, res) => {
    try{
        if (req.body.password != req.body.conformpassword) {
            req.flash('error', 'Password not match');
            return res.redirect('back');
        }
        let user = await User.findByIdAndUpdate(req.params.id, {
            password: req.body.password
        });
        req.flash('success', "Password change sucessful");
        return res.redirect('/');
    }catch(err){
        console.log(err);
        res.redirect('back')
    }
}