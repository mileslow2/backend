const tokens = require('../../database/models/tokens');

module.exports = token =>
{
    return tokens.findOne(
        {
            where: token
        })
        .catch((err) =>
        {
            throw err;
        })
        .then(res =>
        {
            return res === null;
        })
}