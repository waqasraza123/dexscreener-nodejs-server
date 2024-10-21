import express, {Express} from 'express';
require('dotenv').config();
import cors from 'cors';

import authRouter from './routes/authRoutes';
import dexRouter from './routes/dexRoutes';
import geckoRouter from './routes/geckoRoutes';
import stripeRouter from './routes/stripeRoutes';
import predictionRouter from './routes/openai/predictionRoutes';
import chatRouter from './routes/chatRoutes';
import solanaRouter from './routes/solanaRoutes';

const app: Express = express();

app.use(cors());
app.use(express.json());

// import routes
app.use('/api/auth', authRouter);
app.use('/api/dex', dexRouter);
app.use('/api/gecko', geckoRouter);
app.use('/api/stripe', stripeRouter);
app.use('/api/openai', predictionRouter);
app.use('/api/chat', chatRouter);
app.use('/api/blockchain/solana', solanaRouter);

export default app;