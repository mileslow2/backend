const review = require('../../../src/database/models/review');


module.exports = async user_id =>
{
    const query = {
        where:
        {
            user_id
        }
    };
    await review.destroy(query);
}