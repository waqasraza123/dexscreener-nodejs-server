const express = require('express');
const router = express.Router();
const geckoController = require('../controllers/geckoController');

// coingecko apis
router.get('/coins-list-with-market-data', geckoController.coinsListWithMarketData);
router.get('/ohlc-chart-data', geckoController.ohlcChartData);

module.exports = router;