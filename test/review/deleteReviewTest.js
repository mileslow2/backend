const expect = require('chai').expect;
const fetch = require('../helpers/easyFetch');
const randomRestID = require('../helpers/randRestID');

describe('deleting reviews', function () {
    it.only('should delete a review and respond with true', async function () {
        const restaurant_id = await randomRestID();
        const review = {
            stars: "4.7",
            user_id: "14",
            restaurant_id,
            body: "food was great but, oh man do I hate writing",
            first_name: "miles"
        }
        let url = 'http://Miless-MacBook-Pro.local:8081/addReview';
        await fetch(url, review);
        url = 'http://Miless-MacBook-Pro.local:8081/deleteReview';
        const reviewDelete = {
            user_id: "14",
            restaurant_id,
        }
        const res = await fetch(url, reviewDelete);
        expect(true).to.be.equal(res);
    });
})