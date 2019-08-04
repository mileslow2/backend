const review = require('../../../src/database/models/review');


module.exports = async body =>
{
    await review.destroy(
    {
        where: body
    });
}