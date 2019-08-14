const user = require('../../../database/models/user');

module.exports = email =>
{
    return user
        .findOne(
        {
            where:
            {
                email
            }
        })
        .catch(err =>
        {
            throw (err);
        })
}