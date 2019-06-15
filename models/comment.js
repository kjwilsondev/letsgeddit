const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: { type: String, required: true },
  author : { type: Schema.Types.ObjectId, ref: "User", required: true },
  comments: [{type: Schema.Types.ObjectId, ref: "Comment"}]
});

module.exports = mongoose.model("Comment", CommentSchema);

// var Comments = new Schema({
//   title: String,
//   body: String,
//   date: Date
// });

// var BlogPost = new Schema({
//   author: ObjectId,
//   title: String,
//   body: String,
//   date: Date,
//   comments: [Comments],
//   meta: {
//     votes: Number,
//     favs: Number
//   }
// });

// mongoose.model("BlogPost", BlogPost);