const mongoose=require('mongoose');

const postschema=new mongoose.Schema({
    content:{
        type:String
    },
    postimg:{
        type:String
    },
    fileformat:{
        type:String
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //include the array ids of all comment in this post schema itself
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'comment'
        }
    ],
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Like'
        }
    ]
},{
    timestamps:true
});


// const storage = multer.diskStorage(
//     {
//     destination: function (req, file, cb) {
//       cb(null, path.join(__dirname, '..', POST_PATH));
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + "." + file.mimetype.split('/')[1];
//       cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
//   }
// );

// //static method
// postschema.statics.uploadedPost = multer({storage: storage}).single('postimg');
// postschema.statics.postPath = POST_PATH;

const Post=mongoose.model('Post',postschema);
module.exports=Post;