import { Request, Response } from 'express';
import { getTokenInfo } from '../../services/blockchain/solanaBlockchainService';

export const fetchTokenInfo = async (req: Request, res: Response): Promise<void> => {
    const { mintAddress } = req.params;
    try {
        const tokenInfo = await getTokenInfo(mintAddress);
        
        res.status(200).json(tokenInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch token information.' });
    }
};
