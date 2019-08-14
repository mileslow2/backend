const tokens = require('../../database/models/tokens');

module.exports = token =>
{
    const selector = {
        where:
        {
            user_iD: token.user_id
        }
    }
    const valuesToUpdate = {
        iat: token.iat
    }
    tokens.update(valuesToUpdate, selector)
        .catch(err =>
        {
            throw err;
        })
}