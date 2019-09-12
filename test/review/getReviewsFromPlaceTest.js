const expect = require('chai').expect;
const fetch = require('../helpers/easyFetch');
const url = 'http://Miless-MacBook-Pro.local:8081/getReviewsFromPlace';
const randRestID = require('../helpers/randRestID');
const addReview = require('./util/addReview');
const deleteReview = require('./util/deleteReview');

async function populate(restaurant_id) {
    await addReview("14", restaurant_id);
    await addReview("16", restaurant_id);
}

describe('Get all reviews from a specific place', function () {
    it('should get all reviews from a restaurant_id', async function () {
        const google_maps_id = "ChIJ0zR6mSu7woAR4GeLs8NKAnQ";
        const restaurant_id = await randRestID(google_maps_id);
        await populate(restaurant_id);
        const body = {
            restaurant_id
        }
        const res = await fetch(url, body);
        await deleteReview(body);
        expect(2).to.be.equal(res.length);

    })
    it('should return empty array', async function () {
        const google_maps_id = "ChIJ9zv46bu6woARxo8Vn52mcCA";
        let restaurant_id = await randRestID(google_maps_id);
        restaurant_id = restaurant_id.toString();
        const body = {
            restaurant_id
        }
        const res = await fetch(url, body);
        expect(0).to.be.equal(res.length);
    })
})