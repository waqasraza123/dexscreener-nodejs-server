import express, {Router} from 'express';
const dexRouter: Router = express.Router();
import DexController from '../controllers/dexController';

const dexController = new DexController();

// dexscreener api
dexRouter.get('/search', dexController.searchDex);

export default dexRouter;