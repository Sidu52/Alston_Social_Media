const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
},
  (req,email,password,done)=>{
    User.findOne({email:email},(err,user)=>{
        if(err){
            req.flash('Error',err);
            return done(err);
        }
        if(!user || user.password != password){
            req.flash('error','Invalid Username/Password');
            return done(null, false)
        }
        return done(null,user);
    });
  }
));

// Serializing the user to decide which key is to be kept in the cookie
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// desseruaizing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
    User.findById(id, (err, user) => {
        if (err) {
            console.log("Error in finding user")
            return done(err);
        }
        return done(null, user);
    })
});

// check if user is authenticated
passport.checkAuthentication=(req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    return res.redirect('/');
}
passport.setAuthenticatedUser=(req,res,next)=>{
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    next();
}
module.exports=passport;