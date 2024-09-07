import {searchDex, fetchTokens} from "../services/dexService";

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
	
	//get parsed tokens from dexscreener
	tokens = async (req: any, res: any): Promise<void> => {
        const { chainId } = req.query;
		try {
			const data = await fetchTokens(chainId);
            console.log(data[0].token);
			res.status(200).json(data);
		} catch (error: any) {
			res.status(500).json({ error: error.message });
		}
	};
}