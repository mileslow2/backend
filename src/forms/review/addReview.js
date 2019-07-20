const usedDefense = require("../../security");
const review = require('../../database/models/review');

async function addReview(reviewBody)
{
    let worked = false;
    await review
        .create(reviewBody)
        .catch(err => (console.log(err.message)))
        .then(res =>
        {
            if (typeof res == "object") worked = true
        })
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
        res.status(statusCode).end(reviewAdded);
    });
}