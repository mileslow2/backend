const usedDefense = require("../../security");
const keys = ["user_id", "restaurant_id"];
const review = require('../../database/models/review');

async function deleteReview(req) {
    let worked = "true";
    const query = {
        where: req.body
    }
    await review
        .destroy(query)
        .catch(() => {
            worked = "false";
        })
    return worked;
}

module.exports = app => {
    let reviewDeletedSuccesfully, statusCode;
    app.post("/deleteReview", async (req, res) => {
        if (await usedDefense(req, res, keys)) return;
        reviewDeletedSuccesfully = await deleteReview(req);
        statusCode = reviewDeletedSuccesfully ? 200 : 400;
        res.status(statusCode).send(reviewDeletedSuccesfully);
    })
}