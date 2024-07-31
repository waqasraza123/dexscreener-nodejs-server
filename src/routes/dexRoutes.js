const express = require('express');
const router = express.Router();
const dexController = require('../controllers/dexController');

// dexscreener api
router.get('/search', dexController.searchDex);

module.exports = router;