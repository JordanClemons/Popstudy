const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  creator: {
      type: Schema.Types.ObjectId,
      ref: User
  },
  private:{
      type: Boolean,
      required: true,
  },
  likes:{
      type: Number,
      required: true,
  },
  datePosted:{
    type: Date,
    required: true
  },
  content:[
      {
          question: String,
          answer: String
      }
    ]
}, {
  timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;