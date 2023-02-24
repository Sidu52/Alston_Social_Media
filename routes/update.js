const express = require('express');
const passport = require('passport');
const router = express.Router();
const updatedata = require('../controller/updatecontroller');
const multer = require('multer');
const path =require('path');
const POST_PATH =('/uploads/users/posts');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', POST_PATH));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
})

const upload = multer({ storage: storage }) 
upload.fields({ name: 'upload', maxCount: 1 })
router.post('/update/:id', passport.checkAuthentication, updatedata.update);
router.post('/createcomment',updatedata.createcomment);


// router.post('/createpost/:id', passport.checkAuthentication,updatedata.createpost);

router.post('/createpost/:id', passport.checkAuthentication,upload.single('postimg'), updatedata.createpost);

router.get('/deletepost/:id', passport.checkAuthentication, updatedata.deletepost);
router.get('/deletecomment/:id', passport.checkAuthentication, updatedata.deletecomment);

module.exports = router;