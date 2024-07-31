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