const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/').get(userController.getAllUsers);

// For Logged-in users
router.use(authController.protect);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(
    userController.filterUpdateData,
    userController.uploads,
    userController.resizeUploads,
    userController.updateUser
  );
// .delete(userController.deleteUser);

module.exports = router;
