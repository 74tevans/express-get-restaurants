const request = require('supertest');
const {describe, test, expect} = require('@jest/globals');
const app = require('../src/app');
const Restaurant = require('../models/Restaurant');
const syncSeed = require('../seed');
let restQuantity;

describe('Restaurants', () => {
    beforeEach(async () => {
        await syncSeed();
        const restaurants = await Restaurant.findAll();
        restQuantity = restaurants.length;
    });

    test('should return 200 on get', async () => {
        const response = await request(app).get('/restaurants');
        expect(response.statusCode).toBe(200);
    });

    test('should return an array of restaurants', async () => {
        const response = await request(app).get('/restaurants');
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0]).toHaveProperty('name');
        expect(response.body[0]).toHaveProperty('location');
        expect(response.body[0]).toHaveProperty('cuisine');
    });

    test('should return the correct number of restaurants', async () => {
        const response = await request(app).get('/restaurants');
        expect(response.body.length).toEqual(restQuantity);
    });

    test('should return the correct restaurants', async () => {
        const response = await request(app).get('/restaurants');
        expect(response.body).toContainEqual(
            expect.objectContaining({
                id: 1,
                name: 'AppleBees',
                location: 'Texas',
                cuisine: 'FastFood'
            })
        );
    });

    test('should return the correct restaurant', async () => {
        const response = await request(app).get('/restaurants/1');
        expect(response.body).toEqual(
            expect.objectContaining({
                id: 1,
                name: 'AppleBees',
                location: 'Texas',
                cuisine: 'FastFood'
            })
        );
    });

    test('should create a new restaurant', async () => {
        await request(app).post('/restaurants').send({
            name: 'Watermill',
            location: 'Newbury',
            cuisine: 'Pub'
        });
        const restaurants = await Restaurant.findAll();
        expect(restaurants.length).toEqual(restQuantity + 1);
        expect(restaurants[3]).toEqual(
            expect.objectContaining({
                id: 4,
                name: 'Watermill',
                location: 'Newbury',
                cuisine: 'Pub'
            })
        );
    });

    test('should update a restaurant with new data', async () => {
        await request(app).put('/restaurants/1').send({
            location: 'California'
        });
        const restaurants = await Restaurant.findAll();
        expect(restaurants[0]).toEqual(
            expect.objectContaining({
                id: 1,
                name: 'AppleBees',
                location: 'California',
                cuisine: 'FastFood'
            })
        );
    });

    test('should delete a specific restaurant', async () => {
        await request(app).delete('/restaurants/1');
        const restaurants = await Restaurant.findAll();
        expect(restaurants.length).toEqual(restQuantity - 1);
        expect(restaurants).toContainEqual(
            expect.not.objectContaining({
                id: 1,
                name: 'AppleBees',
                location: 'California',
                cuisine: 'FastFood'
            })
        );
    });
});