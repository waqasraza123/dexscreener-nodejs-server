import express, {Router} from 'express';
const geckoRouter: Router = express.Router();
import GeckoController from '../controllers/geckoController';

//routes prefix is /api/gecko
// coingecko apis
geckoRouter.get('/coins-list-with-market-data', GeckoController.coinsListWithMarketData);
geckoRouter.get('/ohlc-chart-data/:tokenId', GeckoController.ohlcChartData);

export default geckoRouter;