const expect = require("chai").expect;
const review = require('../../src/database/models/review');
const randRestID = require('../helpers/randRestID');
const fetch = require('../helpers/easyFetch');
const url = "http://Miless-MacBook-Pro.local:8081/addReview";
const deleteReview = require('./util/deleteReview');

async function getReview(restaurant_id) {
    const findOne = {
        where:
            {
                user_id: "14",
                restaurant_id
            }
    };
    let reviewFromDB;
    await review
        .findOne(findOne)
        .catch((err) => {
            throw (err.message);
        })
        .then(res => (reviewFromDB = res.dataValues));
    return reviewFromDB;
}

function turnKeysToString(obj) {
    for (let key in obj)
        if (typeof obj[key] != "string")
            obj[key] = obj[key].toString();
}

describe('change the review', () => {
    it('should modify an added review', async function () {
        const restaurant_id = await randRestID();
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
        await deleteReview(review);
        expect(reviewFromDB).to.deep.equal(review);
    });
})