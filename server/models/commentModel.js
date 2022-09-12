const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    lowercase: true,
    required: [true, 'Comment must be provided'],
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: 'Post',
    required: [true, 'Comment must have post'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Comment must have post'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: [true, 'Post must have creation date'],
  },
});

commentSchema.pre(/^find/, function (next) {
  this.select('-__v');
  next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
