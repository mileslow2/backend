const addReview = require('./addReview');
const getReviewsFrom = require('./getReviewsFrom');
const deleteReview = require('./deleteReview');

module.exports = app =>
{
    getReviewsFrom(app);
    addReview(app);
    deleteReview(app);
}