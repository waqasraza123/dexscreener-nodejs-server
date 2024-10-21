import { Request, Response } from 'express';
import { getTokenInfo, getTokenAccountInfo } from '../../services/blockchain/solanaBlockchainService';

export const fetchTokenInfo = async (req: Request, res: Response): Promise<void> => {
    const { mintAddress } = req.params;

    //try {
        await getTokenInfo(mintAddress);
        //await getTokenAccountInfo(mintAddress);
        //res.status(200).json(tokenInfo);
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: 'Failed to fetch token information.' });
    // }
};
