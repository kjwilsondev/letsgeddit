const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports = function(app) {
    // CREATE
    app.post("/posts/:postId/comments", function(req, res) {
        // FIND THE PARENT POST
        Post.findById(req.params.postId).exec(function(err, post) {
        // UNSHIFT A NEW COMMENT
        post.comments.unshift(req.body);
        // SAVE THE PARENT
        post.save();
    
        // REDIRECT BACK TO THE PARENT POST#SHOW PAGE TO SEE OUR NEW COMMENT IS CREATE
        return res.redirect(`/posts/` + post._id);
        });
    })
};