const express = require('express');
const passport = require('passport');
const router = express.Router();

const userpassword= require('../controller/forgotpassword');
router.get('/sendmail',userpassword.sendmail);
router.post('/sendemail',userpassword.sendemail);
router.get('/passwordchange/resetpass/:id',userpassword.resetpasswoerd);
router.post('/createnewpassword/:id',userpassword.createnewpassword);
module.exports=router;