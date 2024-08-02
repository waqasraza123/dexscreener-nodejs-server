import axios from 'axios';

class CoinGeckoService {
	private readonly coinGeckoBaseURL: string;
	private readonly coinGeckoAPIKey: string;
	
	constructor() {
		this.coinGeckoBaseURL = process.env.COINGECKO_BASE_URL || '';
		this.coinGeckoAPIKey = process.env.COINGECKO_API_KEY || '';
	}
	
	// Fetch coins list with market data from CoinGecko
	public async coinsListWithMarketData(): Promise<any> {
		try {
			const relativeURL = '/coins/markets';
			const currency = 'usd';
			const completeURL = `${this.coinGeckoBaseURL}${relativeURL}?vs_currency=${currency}`;
			
			const response = await axios.get(completeURL, {
				headers: {
					accept: 'application/json',
					'x-cg-demo-api-key': this.coinGeckoAPIKey
				}
			});
			return response.data;
		} catch (error) {
			throw new Error('Error fetching data from Gecko coinsListWithMarketData API');
		}
	}
	
	// Fetch OHLC chart data from CoinGecko
	public async ohlcChartData(tokenId: string): Promise<any> {
		try {
			console.log(tokenId)
			const relativeURL = `/coins/${tokenId}/ohlc`;
			const currency = 'usd';
			const numberOfDays = 30;
			const completeURL = `${this.coinGeckoBaseURL}${relativeURL}?vs_currency=${currency}&days=${numberOfDays}`;
			console.log(completeURL)
			const response = await axios.get(completeURL, {
				headers: {
					accept: 'application/json',
					'x-cg-demo-api-key': this.coinGeckoAPIKey
				}
			});
			return response.data;
		} catch (error) {
			throw new Error('Error fetching data from Gecko ohlcChartData API');
		}
	}
}

export default new CoinGeckoService();
