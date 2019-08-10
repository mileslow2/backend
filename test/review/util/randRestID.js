const sequelize = require('../../../src/database/connect');

module.exports = async () =>
{
    return await sequelize
        .query("select `restaurant_id` from `restaurant_infos` limit 1;")
        .then((rests) =>
        {
            return rests[0][0].restaurant_id.toString();
        })
}