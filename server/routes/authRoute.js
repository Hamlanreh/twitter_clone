const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/me', authController.getMe, userController.getUser);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);

// For Logged-in users
router.use(authController.protect);

router.patch('/update-password', authController.updatePassword);
router.delete('/deactivateMe', authController.deactivateMe);

module.exports = router;
