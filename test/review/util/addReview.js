const review = require('../../../src/database/models/review');

module.exports = async (user_id, restaurant_id) =>
{
    const query = {
        stars: "4.7",
        user_id,
        restaurant_id,
        body: "food was great but, oh man do I hate writing",
        first_name: "miles"
    }
    await review.create(query)
}