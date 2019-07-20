const restaurant_infos = require('../../src/database/models/restaurant_info');

module.exports = async google_maps_id =>
{
    var id;
    await restaurant_infos
        .findOne(
        {
            where:
            {
                google_maps_id
            },
            attributes: ["restaurant_id"]
        })
        .then(res =>
        {
            id = res.dataValues;
        })
    return id.restaurant_id;
}