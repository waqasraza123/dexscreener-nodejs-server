import CoinGeckoService from '../services/geckoService';

export default new class GeckoController {
	
	// get coins list with market data from coingecko
	coinsListWithMarketData = async (req: any, res: any) => {
		const { q } = req.query;
		try {
			const data = await CoinGeckoService.coinsListWithMarketData();
			res.status(200).json(data);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	};

	// get ohlc chart data from coingecko
	ohlcChartData = async (req: any, res: any) => {
		const { q } = req.query;
		try {
			const data = await CoinGeckoService.ohlcChartData();
			res.status(200).json(data);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	};
}