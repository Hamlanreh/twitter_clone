const express = require('express');
const homeController = require('../controllers/homeController');

const router = express.Router();

router.get('/getTweetsAndRetweets', homeController.getTweetsAndRetweets);

module.exports = router;
