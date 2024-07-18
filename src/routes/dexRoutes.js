const express = require('express');
const router = express.Router();
const dexController = require('../controllers/dexController');

router.get('/search', dexController.searchDex);

module.exports = router;