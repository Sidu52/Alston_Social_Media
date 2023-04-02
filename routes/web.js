const express=require('express');
const passport = require('passport');
const router=express.Router();


const homecontroller=require('../controller/homecontroller');

router.use('/user',require('./user'));
router.use('/update',require('./update'));
router.use('/forgotpassword',require('./forgotpassword'));
router.use('/likes', require('./likes'));


router.get('/',homecontroller.home);
router.get('/userprofile/:id',passport.checkAuthentication,homecontroller.userprofile)
router.post('/emailverification',homecontroller.emailverification)

module.exports=router;