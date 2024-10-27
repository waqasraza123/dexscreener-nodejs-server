import { Router } from 'express';
import { createStream, fetchMultipleNFTs } from '../controllers/web3/moralisController';

const router = Router();

// all routes are prefixed with /api/web3/moralis

router.get('/streams/create_stream', createStream);
router.get('/nfts/multiple', fetchMultipleNFTs);

export default router;