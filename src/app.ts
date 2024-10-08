import express, {Express} from 'express';
require('dotenv').config();
import cors from 'cors';

import authRouter from './routes/authRoutes';
import dexRouter from './routes/dexRoutes';
import geckoRouter from './routes/geckoRoutes';
import stripeRouter from './routes/stripeRoutes';
import predictionRouter from './routes/openai/predictionRoutes';

const app: Express = express();

app.use(cors());
app.use(express.json());

// import routes
app.use('/api/auth', authRouter);
app.use('/api/dex', dexRouter);
app.use('/api/gecko', geckoRouter);
app.use('/api/stripe', stripeRouter);
app.use('/api/openai', predictionRouter);

export default app;