const express = require('express');
const dexRoutes = require('./routes/dexRoutes');

const app = express();

app.use(express.json());
app.use('/api/dex', dexRoutes);

module.exports = app;