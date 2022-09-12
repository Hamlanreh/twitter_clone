const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Tweet must have user'],
  },
  text: {
    type: String,
    maxLength: 140,
  },
  upload: String,
  createdAt: {
    type: Date,
    default: Date.now,
    required: [true, 'Post must have creation date'],
  },
  tweet: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tweet',
  },
  isRetweet: {
    type: Boolean,
    default: false,
  },
});

tweetSchema.post('save', async function (doc, next) {
  await doc.populate({ path: 'user' });
  next();
});

tweetSchema.pre(/^find/, function (next) {
  this.select('-__v');
  next();
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
