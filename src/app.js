const express = require('express');
require('dotenv').config();
const dexRoutes = require('./routes/dexRoutes');
const geckoRoutes = require('./routes/geckoRoutes');

const app = express();

app.use(express.json());

app.use('/api/dex', dexRoutes);
app.use('/api/gecko', geckoRoutes);

module.exports = app;