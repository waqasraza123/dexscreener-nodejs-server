const axios = require('axios');

// fetch coins list with market data from coingecko
exports.coinsListWithMarketData = async (query) => {
	try {
		const coinGeckoBaseURL = process.env.COINGECKO_BASE_URL;
		const coinGeckoAPI_KEY = process.env.COINGECKO_API_KEY;
		const relativeURL = `/coins/markets`;
		const currency = 'usd';
		const completeURL = `${coinGeckoBaseURL}${relativeURL}?vs_currency=${currency}`;
		
		const response = await axios.get(`${completeURL}`, {
			headers: {accept: 'application/json', 'x-cg-demo-api-key': coinGeckoAPI_KEY}
		});
		return response.data;
	} catch (error) {
		throw new Error('Error fetching data from Gecko coinsListWithMarketData API');
	}
};

// fetch OHLC chart data from coingecko
exports.ohlcChartData = async (query) => {
	try {
		const coinGeckoBaseURL = process.env.COINGECKO_BASE_URL;
		const coinGeckoAPI_KEY = process.env.COINGECKO_API_KEY;
		const tokenId = 'solana';
		const relativeURL = `/coins/${tokenId}/ohlc`;
		const currency = 'usd';
		const numberOfDays = 30;
		const completeURL = `${coinGeckoBaseURL}${relativeURL}?vs_currency=${currency}&days=${numberOfDays}`;
		
		const response = await axios.get(`${completeURL}`, {
			headers: {accept: 'application/json', 'x-cg-demo-api-key': coinGeckoAPI_KEY}
		});
		return response.data;
	} catch (error) {
		throw new Error('Error fetching data from Gecko ohlcChartData API');
	}
};