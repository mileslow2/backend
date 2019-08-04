const review = require('../../../database/models/review');

module.exports = async reviewBody =>
{
    return await review
        .count(
        {
            where:
            {
                user_id: reviewBody.user_id,
                restaurant_id: reviewBody.restaurant_id
            }
        })
        .catch(err =>
        {
            throw (err);
        })
        .then(count =>
        {
            return count == 1;
        });
}