const axios = require('axios');

// get all tokens based on the chain name i.e. Solana
exports.searchDex = async (query) => {
	try {
		const response = await axios.get(`https://api.dexscreener.com/latest/dex/search/?q=${query}`);
		return response.data;
	} catch (error) {
		throw new Error('Error fetching data from DexScreener API');
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
		throw new Error('Error fetching data from DexScreener API');
	}
};