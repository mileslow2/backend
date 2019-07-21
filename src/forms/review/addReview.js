const usedDefense = require("../../security");
const review = require('../../database/models/review');

async function addReview(reviewBody)
{
    let worked = true;
    await review
        .create(reviewBody)
        .catch(err => (worked = false))
    return worked;
}

module.exports = app =>
{
    const keys = ["stars", "user_id", "restaurant_id", "body"];
    let reviewAdded, statusCode;
    app.post("/addReview", async (req, res) =>
    {
        if (usedDefense(req, res, keys)) return;
        reviewAdded = await addReview(req.body);
        statusCode = reviewAdded ? 200 : 400;
        reviewAdded = reviewAdded.toString();
        res.status(statusCode).end(reviewAdded);
    });
}