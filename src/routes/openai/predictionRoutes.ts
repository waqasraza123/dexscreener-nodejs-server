import { Router } from 'express';
import { predictTokenPerformance } from '../../controllers/openai/predictionController';

const predictionRouter = Router();

predictionRouter.post('/predict', predictTokenPerformance);

export default predictionRouter;
