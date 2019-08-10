const expect = require("chai").expect;
const getPlaceID = require('../helpers/getPlaceID');
const fetch = require('../helpers/easyFetch');
const deleteReview = require('./util/deleteReview');
const url = 'http://Miless-MacBook-Pro.local:8081/addReview';
const sequelize = require('../../src/database/connect');

async function randomRestID()
{
    return await sequelize
        .query("SELECT `restaurant_id` FROM `restaurant_infos`;")
        .then((rests) =>
        {
            return rests[0][0].restaurant_id.toString();
        })
}

describe('add review', () =>
{

    it('should add a review', async function()
    {

        const restaurant_id = await randomRestID();
        const review = {
            stars: "4.7",
            user_id: "14",
            restaurant_id,
            body: "food was great but, oh man do I hate writing",
            first_name: "miles"
        }
        const res = await fetch(url, review);
        await deleteReview(review);
        expect(true).to.be.equal(res);
    });
    it('should add a review without a body', async function()
    {
        const restaurant_id = await randomRestID();
        const review = {
            stars: "4.7",
            user_id: "14",
            restaurant_id,
            body: "",
            first_name: "miles"
        }
        const res = await fetch(url, review);
        await deleteReview(review);
        expect(true).to.be.equal(res);
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
    });
})