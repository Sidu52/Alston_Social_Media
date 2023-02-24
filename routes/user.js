const express = require('express');
const passport = require('passport');
const router = express.Router();

const usercontroller = require('../controller/usercontroller');
router.get('/alstonpage',passport.checkAuthentication ,usercontroller.alstonpage);
router.get('/singup',usercontroller.singup);
router.get('/singout',usercontroller.singout);
router.post('/createuser', usercontroller.createuser);
router.post('/loginuser',passport.authenticate(
    'local',
    {failureRedirect:'/'},
),usercontroller.loginuser);

module.exports=router;