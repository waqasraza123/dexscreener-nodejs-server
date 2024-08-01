import {searchDex} from "../services/dexService";

export default class DexController {
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
}