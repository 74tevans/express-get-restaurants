const express = require("express");
const app = express();
const routeRestaurants = require('../routes/restaurants');

app.use('/restaurants', routeRestaurants);

module.exports = app;