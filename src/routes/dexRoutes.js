const express = require('express');
const router = express.Router();
const dexController = require('../controllers/dexController');

// dexscreener api
router.get('/search', dexController.searchDex);

// coingecko api
router.get('/ohlc-chart-data', dexController.ohlcChartData);
router.get('/ohlc-chart-data', dexController.ohlcChartData);

module.exports = router;