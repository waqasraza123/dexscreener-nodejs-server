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
import moralisRouter from './routes/moralisRoutes';
import magicRouter from './routes/magicRoutes';

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
//routes with blockchain
app.use('/api/blockchain/solana', solanaRouter);
//direct web3 related routes
app.use('/api/web3/moralis', moralisRouter);
app.use('/api/web3/magic', magicRouter);

export default app;