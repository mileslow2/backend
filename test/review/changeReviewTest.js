const expect = require("chai").expect;
const review = require('../../src/database/models/review');
const getPlaceID = require('../helpers/getPlaceID');
const fetch = require('../../src/helpers/easyFetch');
const url = "http://Miless-MacBook-Pro.local:8081/addReview";
const deleteReview = require('./util/deleteReview');
const google_maps_id = "ChIJ6cIVzBmWwoARhSdO0XcmXdk";

async function getReview(restaurant_id)
{
    const findOne = {
        where:
        {
            user_id: "14",
            restaurant_id
        }
    };
    let reviewFromDB;
    await
    review
        .findOne(findOne)
        .catch((err) =>
        {
            console.log(err);
        }).then(res => (reviewFromDB = res.dataValues));
    return reviewFromDB;
}

function turnKeysToString(obj)
{
    for (var key in obj)
        if (typeof obj[key] != "string")
            obj[key] = obj[key].toString();
}

describe('change the review', () =>
{
    it('should modify an added review', async function()
    {
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
        let reviewFromDB = await getReview(restaurant_id);
        turnKeysToString(reviewFromDB);
        expect(reviewFromDB).to.deep.equal(review);
        await deleteReview("14")
    });
})