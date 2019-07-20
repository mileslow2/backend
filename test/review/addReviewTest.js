const expect = require("chai").expect;
const getPlaceID = require('../helpers/getPlaceID');
const fetch = require('../../src/helpers/easyFetch');
const url = "http://Miless-MacBook-Pro.local:8081/addReview";

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
            body: "food was great but, oh man do I hate writing"
        }
        const res = await fetch(url, review);
        expect(true).to.be.equal(res);
    })
})