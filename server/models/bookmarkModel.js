const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  tweet: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tweet',
    required: [true, 'Bookmark must have tweet'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Bookmark must have user'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: [true, 'Bookmark must have creation date'],
  },
});

// Users can only bookmark a post once
bookmarkSchema.index({ tweet: 1, user: 1 }, { unique: true });

bookmarkSchema.pre(/^find/, function (next) {
  this.select('-__v');
  next();
});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;
