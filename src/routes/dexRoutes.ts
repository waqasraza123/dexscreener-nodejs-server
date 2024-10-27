import express, {Router} from 'express';
const dexRouter: Router = express.Router();
import DexController from '../controllers/dexController';

// routes prefix is /api/dex
// dexscreener api
dexRouter.get('/search', DexController.searchDex);

//return paginated response in this
dexRouter.get('/tokens', DexController.tokens);

dexRouter.get('/tokens/token/info/:contract_address', DexController.getTokenInfo);
dexRouter.get('/tokens/token/:contract_address/holders', DexController.getTokenHolders);
dexRouter.get('/tokens/token/:contract_address/transfers', DexController.getTokenTransfers);

export default dexRouter;