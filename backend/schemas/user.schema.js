const mongoose = require('mongoose');

const Schema = mongoose.Schema;
let Post = require('../schemas/post.schema')

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashedPassword:{
    type: String,
    required: true,
    minlength: 9
  },
  myLikes:[{
    type: Schema.Types.ObjectId, 
    ref: Post
  }]
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;