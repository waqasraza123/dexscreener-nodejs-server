const express = require('express');
require('dotenv').config();
const dexRoutes = require('./routes/dexRoutes');

const app = express();

app.use(express.json());
app.use('/api/dex', dexRoutes);

module.exports = app;