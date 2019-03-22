// server.js
const express = require('express');
const app = express();
const db = require('./db');
const cors = require('cors');

import StopsController from './controllers/StopsController';
import TripsController from './controllers/TripsController';
import UsersController from './controllers/UsersController';

const port = process.env.PORT || 3001;

//CORS Access lift (we eventually want to add security using JWT and whitelist our platforms IP's)
app.use(cors());

app.use('/stops', StopsController);
app.use('/trips', TripsController);
app.use('/users', UsersController);

app.listen(port, () => console.log(`Listening on port ${port}!`));

module.exports = app;
