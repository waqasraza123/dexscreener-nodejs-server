const dexService = require('../services/dexService');

// search for chain id
exports.searchDex = async (req, res) => {
	const { q } = req.query;
	try {
		const data = await dexService.searchDex(q);
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// get ohlc chart data from coingecko
exports.ohlcChartData = async (req, res) => {
	const { q } = req.query;
	try {
		const data = await dexService.ohlcChartData(q);
		res.status(200).json(data);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};