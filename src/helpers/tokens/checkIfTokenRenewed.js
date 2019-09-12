const tokens = require('../../database/models/tokens');

module.exports = token => {
    delete token.exp;
    return tokens.findOne(
        {
            where: token
        })
        .catch((err) => {
            throw err;
        })
        .then(res => {
            return res === null;
        })
};