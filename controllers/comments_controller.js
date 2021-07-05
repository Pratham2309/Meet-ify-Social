const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function (req, res) {
    // Post.findById(req.body.post, function (err, post) {
    //     if (post) {
    //         Comment.create({
    //             content: req.body.content,
    //             post: req.body.post,
    //             user: req.user._id
    //         }, function (err, comment) {
    //             if (err) {
    //                 console.log("Error while cretaing a comment", err);
    //                 return;
    //             }
    //             post.comments.push(comment);
    //             post.save();
    //             res.redirect('/');
    //         });
    //     }
    // });

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
            req.flash('success' , 'Comment added successfully');
            res.redirect('/');
        }
    }
    catch (err) {
        req.flash('error',err);
        console.log("Error while cretaing a comment", err);
        return res.redirect('back');
    }
}

module.exports.destroy = async function (req, res) {
    // Comment.findById(req.params.id, function (err, comment) {
    //     if (comment.user = req.user.id) {
    //         let postId = comment.post;
    //         comment.remove();
    //         Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }, function (err, post) {
    //             return res.redirect('back');
    //         });
    //     }
    //     else {
    //         return res.redirect('back');
    //     }
    // });

    try {
        let comment = await Comment.findById(req.params.id);
        if (comment.user = req.user.id) {
            let postId = comment.post;
            comment.remove();
            await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id }});
            req.flash('success' , 'Comment deleted successfully');
            return res.redirect('back');
        }
        else {
            return res.redirect('back');
        }
    }
    catch (err) {
        req.flash('error',err);
        console.log("Error", err);
        return res.redirect('back');
    }
}