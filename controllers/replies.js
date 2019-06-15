var Post = require("../models/post");
var Comment = require("../models/comment");
var User = require("../models/user");

module.exports = app => {
  // NEW REPLY
  app.get("/posts/:postId/comments/:commentId/replies/new", (req, res) => {
    let post;
    Post.findById(req.params.postId)
      .then(p => {
        post = p;
        return Comment.findById(req.params.commentId);
      })
      .then(comment => {
        res.render("replies-new", { post, comment });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  // POST REPLY
    app.post("/posts/:postId/comments/:commentId/replies", (req, res) => {
        Post.findById(req.params.postId)
        .then(post => {
            var comment = post.comments.id(req.params.commentId);
            comment.comments.unshift(req.body);
            return post.save();
        })
        .then(post => {
            res.redirect("/posts/" + post._id);
        })
        .catch(err => {
            console.log(err.message);
        });
    });
};