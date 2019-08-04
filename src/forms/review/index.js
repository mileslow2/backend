const addReview = require('./addReview');
const getReviewsFrom = require('./getReviewsFrom');
module.exports = app =>
{
    getReviewsFrom(app);
    addReview(app);
}