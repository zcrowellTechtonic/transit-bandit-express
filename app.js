// server.js
const express = require('express');
const app = express();
const db = require('./db');
const cors = require('cors');

import StopsController from './controllers/StopsController';

const port = process.env.PORT || 3001;

//CORS Access lift (we eventually want to add security using JWT and whitelist our platforms IP's)
app.use(cors());

app.use('/stops', StopsController);

app.listen(port, () => console.log(`Listening on port ${port}!`));

module.exports = app;
