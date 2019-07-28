const review = require('../../../database/models/review');

module.exports = async reviewBody =>
{
    let worked = true;
    const selector = {
        where:
        {
            user_id: reviewBody.user_id,
            restaurant_id: reviewBody.restaurant_id
        }
    };
    delete reviewBody.user_id;
    delete reviewBody.restaurant_id;
    const valuesToChange =
        await review
        .update(reviewBody, selector)
        .catch(() => (worked = false))
    return worked;
}