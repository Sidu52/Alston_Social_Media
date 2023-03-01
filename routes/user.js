const express = require('express');
const passport = require('passport');
const router = express.Router();

const usercontroller = require('../controller/usercontroller');
router.get('/alstonpage',passport.checkAuthentication ,usercontroller.alstonpage);
router.get('/singup',usercontroller.singup);
router.get('/singout',usercontroller.singout);
router.post('/createuser/:id', usercontroller.createuser);
router.get('/reals',passport.checkAuthentication,usercontroller.reals);
router.post('/loginuser',passport.authenticate(
    'local',
    {failureRedirect:'/'},
),usercontroller.loginuser);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/'}),usercontroller.loginuser)


module.exports=router;