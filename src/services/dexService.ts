import axios from 'axios';
import supabase from '../config/supabaseClient';

// get all tokens based on the chain name i.e. Solana
export const searchDex = async (query: string): Promise<any> => {
	try {
		const response = await axios.get(`https://api.dexscreener.com/latest/dex/search/?q=${query}`);
		return response.data;
	} catch (error) {
		throw new Error('Error fetching data from DexScreener API');
	}
};


// Fetch tokens based on the chainId from Supabase
export const fetchTokens = async (chainId: string): Promise<any> => {
	try {
		// Query the tokens from Supabase
		const { data, error } = await supabase
			.from('tokens')
			.select('*');
		
		if (error) {
			throw new Error(`Error fetching data from Supabase: ${error.message}`);
		}
		
		// Return the token data
		return data;
	} catch (error) {
		throw new Error('Error fetching data from Supabase');
	}
};