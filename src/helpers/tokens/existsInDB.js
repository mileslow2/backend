const used_tokens = require('../../database/models/used_tokens');

module.exports = async token =>
{
    return await used_tokens
        .count(
        {
            where:
            {
                used_token: token
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