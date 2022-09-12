const express = require('express');
const authController = require('../controllers/authController');
const retweetController = require('../controllers/retweetController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(retweetController.getAllTweetRetweets)
  .post(
    retweetController.filterRetweetData,
    retweetController.getUserId,
    retweetController.createRetweet
  );

router
  .route('/:id')
  .get(retweetController.getRetweet)
  .patch(retweetController.updateRetweet)
  .delete(retweetController.deleteRetweet);

module.exports = router;
