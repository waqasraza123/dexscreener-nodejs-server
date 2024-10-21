import { Router } from 'express';
import { fetchTokenInfo } from '../controllers/blockchain/solanaBlockchainController';

const router = Router();

// all routes are prefixed with /api/solana-blockchain

// Route to get token information by mint address
router.get('/token/:mintAddress', fetchTokenInfo);

export default router;