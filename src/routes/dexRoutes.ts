import express, {Router} from 'express';
const dexRouter: Router = express.Router();
import DexController from '../controllers/dexController';

const dexController = new DexController();

// routes prefix is /api/dex
// dexscreener api
dexRouter.get('/search', dexController.searchDex);

export default dexRouter;