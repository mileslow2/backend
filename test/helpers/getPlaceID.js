const restaurant_infos = require('../../src/database/models/restaurant_info');

module.exports = async google_maps_id =>
{
    let id;
    await restaurant_infos
        .findOne(
        {
            where:
            {
                google_maps_id
            },
            attributes: ["restaurant_id"]
        })
        .catch(err =>
        {
            throw (err)
        })
        .then(res =>
        {
            id = res.dataValues.restaurant_id;
        })
    return id.toString();
}