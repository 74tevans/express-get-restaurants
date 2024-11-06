const express = require('express');
const routeRestaurants = express.Router();
const Restaurant = require("../models/index");

routeRestaurants.use(express.json());
routeRestaurants.use(express.urlencoded({extended: true}));

routeRestaurants.get('/', async (req, res) => {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
});

routeRestaurants.get('/:id', async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id);
    res.json(restaurant);
});

routeRestaurants.post('/', async (req, res) => {
    const restaurant = await Restaurant.create(req.body);
    res.json(restaurant);
});

routeRestaurants.put('/:id', async (req, res) => {
    const restaurant = await Restaurant.update(req.body, {where: {id: req.params.id}});
    res.json(restaurant);
});

routeRestaurants.delete('/:id', async (req, res) => {
    const restaurant = await Restaurant.destroy({where: {id: req.params.id}});
    res.json(restaurant);
});

module.exports = routeRestaurants;