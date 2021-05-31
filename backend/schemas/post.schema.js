const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  creator: {
      type: String,
      required: true
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
  content:[]
}, {
  timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;