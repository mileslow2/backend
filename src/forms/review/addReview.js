const usedDefense = require("../../security");
const review = require('../../database/models/review');
const alterReview = require('./util/alterReview');
const checkIfReviewExists = require('./util/reviewExists');

async function handleReview(reviewBody)
{
    const reviewExists = await checkIfReviewExists(reviewBody);
    if (reviewExists)
        return await alterReview(reviewBody);
    else
        return await addReview(reviewBody);
}

async function addReview(reviewBody)
{
    let worked = true;
    await review
        .create(reviewBody)
        .catch(() =>
        {
            worked = false
        });
    return worked;
}

module.exports = app =>
{
    const keys = ["stars", "user_id", "restaurant_id", "body"];
    var reviewAdded, statusCode;
    app.post("/addReview", async (req, res) =>
    {
        if (usedDefense(req, res, keys)) return;
        reviewAdded = await handleReview(req.body);
        statusCode = reviewAdded ? 200 : 400;
        reviewAdded = reviewAdded.toString();
        res.status(statusCode).end(reviewAdded);
    });
}