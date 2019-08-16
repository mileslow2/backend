const user = require('../../../src/database/models/tokens')

function cleanup(user_id)
{
    const query = {
        where:
        {
            user_id
        }
    }
    user
        .destroy(query)
        .catch(err =>
        {
            throw err;
        });
}

module.exports = async user_id =>
{
    const query = {
        where:
        {
            user_id
        }
    }
    const exists = await user
        .findOne(query)
        .catch(err =>
        {
            throw (err);
        })
        .then(res =>
        {
            return res !== null;
        })
    // await cleanup(user_id);
    return exists;
}