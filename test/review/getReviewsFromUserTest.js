const expect = require('chai').expect;
const fetch = require('../helpers/easyFetch');
const url = 'http://Miless-MacBook-Pro.local:8081/getReviewsFromUser';
const randRestID = require('../helpers/randRestID');
const addReview = require('./util/addReview');
const deleteReview = require('./util/deleteReview');

async function populate()
{
    let google_maps_id = "ChIJcaqDn7-6woARNn2eauKOKSc";
    let restaurant_id = await randRestID(google_maps_id);
    restaurant_id = restaurant_id.toString();
    google_maps_id = "ChIJxS6RQ466woARryN0C786MwI";
    restaurant_id = await randRestID(google_maps_id);
    restaurant_id = restaurant_id.toString();
    await addReview("14", restaurant_id);
    await addReview("14", restaurant_id);
}

describe('Get all reviews from a specific user', function()
{
    it('should get all reviews from a user_id', async function()
    {
        await populate();
        const body = {
            user_id: "14"
        }
        const res = await fetch(url, body);
        await deleteReview(body);
        expect(2).to.be.equal(res.length);
    })
    it('should return empty array', async function()
    {
        const body = {
            user_id: "14"
        }
        const res = await fetch(url, body);
        expect(0).to.be.equal(res.length);
    })
})