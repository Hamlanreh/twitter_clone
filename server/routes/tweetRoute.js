const express = require('express');
const authController = require('../controllers/authController');
const tweetController = require('../controllers/tweetController');
const bookmarkController = require('../controllers/bookmarkController');
const commentRoute = require('./commentRoute');
const retweetRoute = require('./retweetRoute');
const bookmarkRoute = require('./bookmarkRoute');

const router = express.Router();

router.get('/getAllTweets', tweetController.getAllTweets);

// For Logged-in users
router.use(authController.protect);

router
  .route('/')
  .get(tweetController.getUserId, tweetController.getMyTweets)
  .post(
    tweetController.upload,
    tweetController.resizeUpload,
    tweetController.filterTweetData,
    tweetController.getUserId,
    tweetController.createTweet
  );

router
  .route('/:id')
  .get(tweetController.getTweet)
  .patch(tweetController.filterTweetData, tweetController.updateTweet)
  .delete(tweetController.deleteTweet);

// Related to comments
router.use('/:id/comments', commentRoute);
// Related to retweets
router.use('/:id/retweets', retweetRoute);
// Related to bookmarks
router
  .route('/:id/bookmarks')
  .post(
    bookmarkController.filterBookmarkData,
    bookmarkController.getUserId,
    bookmarkController.createBookmark
  );
router.use('/:id/bookmarks', bookmarkRoute);

module.exports = router;
