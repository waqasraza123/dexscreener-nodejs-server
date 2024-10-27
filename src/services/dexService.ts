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
export const fetchTokens = async (chainId: string, limit: number, offset: number): Promise<any> => {
	try {
		// Query the tokens from Supabase with pagination
		const { data: tokensData, error: tokensError, count } = await supabase
			.from('tokens')
			.select('*', { count: 'exact' }) // Get the total count of rows
			// Filter by chainId .eq('chain_id', chainId)
			.range(offset, offset + limit - 1); // Apply limit and offset for pagination

		if (tokensError) {
			throw new Error(`Error fetching tokens from Supabase: ${tokensError.message}`);
		}

		// Return the token data along with the total count for pagination
		return {
			tokensData,
			total: count
		};
	} catch (error) {
		throw new Error('Error fetching tokens from Supabase');
	}
};

export const getTokenInfo = async (contract_address: string): Promise<any> => {
    try {
        // Fetch token data from 'tokens' table
        const { data: tokenData, error: tokenError } = await supabase
            .from('tokens')
            .select('*')
            .eq('contract_address', contract_address)
            .single();

        if (tokenError) {
            throw new Error(`Error fetching token data from Supabase: ${tokenError.message}`);
        }

        // Return the token data
        return tokenData;

    } catch (error: any) {
        throw new Error(`Error fetching token info: ${error.message}`);
    }
};


export const getTokenHolders = async (contract_address: string, limit: number, offset: number): Promise<any> => {
    const TEST_CONTRACT_ADDRESS_FOR_HOLDERS_TABLE = '3xhezws6Lk7cMqoVEfZFXu3ry9GKymFz1vbWyQ4f99uX';
    try {
        const { data: holdersData, error: holdersError, count } = await supabase
            .from('token_holders')
            .select('*', { count: 'exact' }) // To get the total count of rows
            .eq('contract_address', TEST_CONTRACT_ADDRESS_FOR_HOLDERS_TABLE)
            .range(offset, offset + limit - 1); // Limit the range for pagination

        if (holdersError) {
            throw new Error(`Error fetching token holders from Supabase: ${holdersError.message}`);
        }

        return {
            holdersData,
            total: count // Return the total count for frontend
        };
    } catch (error: any) {
        throw new Error(`Error fetching token holders: ${error.message}`);
    }
};

export const getTokenTransfers = async (contract_address: string, limit: number, offset: number): Promise<any> => {
    const TEST_CONTRACT_ADDRESS_FOR_TRANSFERS_TABLE = 'FEN72JRg6uxbE4sXVJa4kJCWgvEBA5yqeQ1iCu1Npump';
    try {
        const { data: transfersData, error: transfersError, count } = await supabase
            .from('token_transfers')
            .select('*', { count: 'exact' }) // To get the total count of rows
            .eq('contract_address', TEST_CONTRACT_ADDRESS_FOR_TRANSFERS_TABLE)
            .range(offset, offset + limit - 1); // Limit the range for pagination

        if (transfersError) {
            throw new Error(`Error fetching token transfers from Supabase: ${transfersError.message}`);
        }

        return {
            transfersData,
            total: count // Return the total count for frontend
        };
    } catch (error: any) {
        throw new Error(`Error fetching token transfers: ${error.message}`);
    }
};
