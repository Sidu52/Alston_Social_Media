const express=require('express');
const passport = require('passport');
const router=express.Router();


const homecontroller=require('../controller/homecontroller');

router.use('/user',require('./user'));
router.use('/update',require('./update'));


router.get('/',homecontroller.home);
router.get('/userprofile/:id',passport.checkAuthentication,homecontroller.userprofile)

module.exports=router;