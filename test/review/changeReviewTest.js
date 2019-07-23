const expect = require("chai").expect;
const getPlaceID = require('../helpers/getPlaceID');
const fetch = require('../../src/helpers/easyFetch');
const url = "http://Miless-MacBook-Pro.local:8081/addReview";
const deleteReview = require('./util/deleteReview');

async function getReview(restaurant_id)
{
    const findOne = {
        where:
        {
            user_id: "14",
            restaurant_id
        }
    };
    return review
        .findOne(findOne)
        .catch(errorHandler)
        .dataValues;
}

describe('add review', () =>
{
    it('should modify an added review', async function()
    {
        const google_maps_id = "ChIJ164AL6fy6IkRIVz6x2wafWk";
        let restaurant_id = await getPlaceID(google_maps_id);
        restaurant_id = restaurant_id.toString();
        let review = {
            stars: "4.7",
            user_id: "14",
            restaurant_id,
            body: "food was great but, oh man do I hate writing",
            first_name: "miles"
        }
        const res = await fetch(url, review);
        expect(true).to.be.equal(res);
        review.body = "test test test";
        await fetch(url, review);
        const reviewFromDB = await getReview(restaurant_id);
        expect(review).to.deep.equal(reviewFromDB);
        await deleteReview(user_id)
    });
})