import axios from 'axios';
import fs from 'fs';
import path from 'path';

// get all tokens based on the chain name i.e. Solana
export const searchDex = async (query: string): Promise<any> => {
	try {
		const response = await axios.get(`https://api.dexscreener.com/latest/dex/search/?q=${query}`);
		return response.data;
	} catch (error) {
		throw new Error('Error fetching data from DexScreener API');
	}
};


// get all parsed tokens
export const fetchTokens = async (chainId: string): Promise<any> => {
	//try {
		// Resolve the path to the JSON file
		const filePath = path.resolve(__dirname, '../../data.json');
		
		// Read the file contents
		const fileData = fs.readFileSync(filePath, 'utf-8');
		
		// Parse the JSON data
		const tokens = JSON.parse(fileData);
		
		return tokens;
	// } catch (error) {
	// 	throw new Error('Error fetching data from local JSON file');
	// }
};