import {searchDex, fetchTokens, getTokenInfo, getTokenHolders, getTokenTransfers} from "../services/dexService";

export default new class DexController {
	
	// search for chain id
	searchDex = async (req: any, res: any): Promise<void> => {
		const { q } = req.query;
		try {
			const data = await searchDex(q);
			res.status(200).json(data);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	};

    //get token data
	getTokenInfo = async (req: any, res: any): Promise<void> => {
        const { contract_address } = req.params;
		try {
			const data = await getTokenInfo(contract_address);
			res.status(200).json(data);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	};

    //get tokens from supabase
	tokens = async (req: any, res: any): Promise<void> => {
        const { chainId } = req.query;
        const { limit = 10, offset = 0 } = req.query;
		try {
			const data = await fetchTokens(chainId, parseInt(limit), parseInt(offset));
			res.status(200).json(data);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	};

    getTokenHolders = async (req: any, res: any): Promise<void> => {
        const { contract_address } = req.params;
        const { limit = 10, offset = 0 } = req.query; // Default to limit 10, offset 0
    
        try {
            const data = await getTokenHolders(contract_address, parseInt(limit), parseInt(offset));
            res.status(200).json(data);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    };
    
    getTokenTransfers = async (req: any, res: any): Promise<void> => {
        const { contract_address } = req.params;
        const { limit = 10, offset = 0 } = req.query; // Default to limit 10, offset 0
    
        try {
            const data = await getTokenTransfers(contract_address, parseInt(limit), parseInt(offset));
            res.status(200).json(data);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    };    
    
}