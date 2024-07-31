const geckoService = require('../services/geckoService');

// get coins list with market data from coingecko
exports.coinsListWithMarketData = async (req, res) => {
	const { q } = req.query;
	try {
		const data = await geckoService.coinsListWithMarketData(q);
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// get ohlc chart data from coingecko
exports.ohlcChartData = async (req, res) => {
	const { q } = req.query;
	try {
		const data = await geckoService.ohlcChartData(q);
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};