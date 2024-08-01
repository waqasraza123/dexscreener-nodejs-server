import express, {Express} from 'express';
require('dotenv').config();

import dexRouter from './routes/dexRoutes';
import geckoRouter from './routes/geckoRoutes';

const app: Express = express();

app.use(express.json());

// import routes
app.use('/api/dex', dexRouter);
app.use('/api/gecko', geckoRouter);

export default app;