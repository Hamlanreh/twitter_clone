const express = require('express');
const authController = require('../controllers/authController');
const bookmarkController = require('../controllers/bookmarkController');

const router = express.Router({ margeRoutes: true });

router.use(authController.protect);

router
  .route('/')
  .get(bookmarkController.getUserId, bookmarkController.getMyBookmarks);

router
  .route('/:id')
  .get(bookmarkController.getBookmark)
  .delete(bookmarkController.deleteBookmark);

module.exports = router;
