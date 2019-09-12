const usedDefense = require("../../security");
const getReviews = require('./util/getReviews');

async function getReviewsFrom(req, res, keys) {
    if (await usedDefense(req, res, keys)) return;
    let reviews = await getReviews(req.body);
    reviews = JSON.stringify(reviews);
    res.status(200).end(reviews);
}

module.exports = app => {
    const userKeys = ["user_id"];
    app.post("/getReviewsFromUser", async (req, res) => {
        await getReviewsFrom(req, res, userKeys);
    });

    const restKeys = ["restaurant_id"];
    app.post("/getReviewsFromPlace", async (req, res) => {
        await getReviewsFrom(req, res, restKeys);
    });
}