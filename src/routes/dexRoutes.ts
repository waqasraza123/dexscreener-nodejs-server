import express, {Router} from 'express';
const dexRouter: Router = express.Router();
import DexController from '../controllers/dexController';

// routes prefix is /api/dex
// dexscreener api
dexRouter.get('/search', DexController.searchDex);

//return paginated response in this
dexRouter.get('/tokens', DexController.tokens);

export default dexRouter;