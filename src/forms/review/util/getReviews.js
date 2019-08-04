const review = require('../../../database/models/review');

function format(reviews)
{
    for (let i = 0; i < reviews.length; i++)
        reviews[i] = reviews[i].dataValues;
}

module.exports = async body =>
{
    const query = {
        where: body
    }
    let reviews;
    await review
        .findAll(query)
        .catch(err => (console.log(err.message)))
        .then(res =>
        {
            reviews = res
        });
    format(reviews);
    return reviews;
}