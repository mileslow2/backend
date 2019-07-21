const expect = require("chai").expect;
const getPlaceID = require('../helpers/getPlaceID');
const fetch = require('../../src/helpers/easyFetch');
const review = require('../../src/database/models/review');
const url = "http://Miless-MacBook-Pro.local:8081/addReview";

async function deleteReview(user_id)
{
    const query = {
        where:
        {
            user_id
        }
    };
    await review.destroy(query);
}

describe('add review', () =>
{

    it('should add a review', async function()
    {
        const google_maps_id = "ChIJ164AL6fy6IkRIVz6x2wafWk";
        let restaurant_id = await getPlaceID(google_maps_id);
        restaurant_id = restaurant_id.toString();
        const review = {
            stars: "4.7",
            user_id: "14",
            restaurant_id,
            body: "food was great but, oh man do I hate writing",
            first_name: "miles"
        }
        const res = await fetch(url, review);
        expect(true).to.be.equal(res);
        await deleteReview(review.user_id);
    });
    it('should add a review without a body', async function()
    {
        const google_maps_id = "ChIJ164AL6fy6IkRIVz6x2wafWk";
        let restaurant_id = await getPlaceID(google_maps_id);
        restaurant_id = restaurant_id.toString();
        const review = {
            stars: "4.7",
            user_id: "14",
            restaurant_id,
            body: "",
            first_name: "miles"
        }
        const res = await fetch(url, review);
        expect(true).to.be.equal(res);
        await deleteReview(review.user_id);
    });
    it('should not add a review because of bad user_id or restaurant_id', async function()
    {
        const review = {
            stars: "4.7",
            user_id: "14",
            restaurant_id: "1",
            body: "food was great but, oh man do I hate writing",
            first_name: "miles"
        }
        const res = await fetch(url, review);
        expect(false).to.be.equal(res);
        // await deleteReview(review.user_id);
    });
})