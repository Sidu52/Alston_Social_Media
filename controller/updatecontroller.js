const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comments');
const fs = require('fs');
const path = require('path');
const POST_PATH = ('/uploads/users/posts');
const VIDEO_PATH = ('/uploads/users/posts/video');

module.exports.update = async function (req, res) {
    try {
        if (req.user.id == req.params.id) {

            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function (err) {
                if (err) { console.log("Multer Error: ", err) }
                if (req.file) {
                    //removing previousely present avatar before adding new one
                    if (user.avatar) {
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    //this is saving the path of uploaded file into the avatar field in User
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });

        } else {
            req.flash('error', 'Unauthorized!');
            return res.status(401).send('Unauthorized');
        }
    } catch (err) {
        req.flash('error', err);
        return res.redirect('back');
    }
}

module.exports.createpost = async (req, res) => {
    try{
        const extension = path.extname(req.file.originalname).toLowerCase();
        if (req.user.id == req.params.id) {
            let post = await Post.create({
                content: req.body.content,
                user: req.user._id,
                fileformat: extension
            })
            if (req.file) {
                post.postimg = POST_PATH + '/' + req.file.filename;
            }
            await post.save()
            req.flash('success', 'Post Created Successfull!');
            return res.redirect('back');
        }
        else {
            req.flash('error', 'Unauthorized!');
            return res.status(401).send('Unauthorized');
        }
    }catch(err){
        console.log(err);
        
    }

}

module.exports.createcomment = async (req, res) => {
    try {
        let post = await Post.findById(req.body.post);

        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();

            comment = await comment.populate('user', 'username email');

            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                })
            }
            req.flash("success", "Comment Create Successfull!")
            res.redirect('back');
        }
    }
    catch (err) {
        console.log("Error", err);
        return;
    }
}

// delete Post
module.exports.deletepost = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);
        if (post.user == req.user.id) {
            post.remove();
            await Comment.deleteMany({ post: req.params.id });

            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }
            req.flash("error", "Post Deleted!")
            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log("Error", err);
    }
}

// delete Comment
module.exports.deletecomment = async (req, res) => {
    try {
        let comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id) {
            let postId = comment.post;
            comment.remove();
            let post = Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } })
            req.flash('error', 'Comment Deleted!')
            return res.redirect('back')
        } else {
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log("Error", err);
    }
}














