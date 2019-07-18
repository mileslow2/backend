const restaurants = require("../../database/models/restaurants");
const sequelize = require("../../database/connect");

async function newMarker(data)
{
    var marker = data.geometry.location;
    marker.name = data.name;
    var restaurant_id;
    await restaurants
        .create(marker)
        .catch(err =>
        {
            throw (err)
        })
        .then(res =>
        {
            restaurant_id = res.dataValues.restaurant_id
        })
    return restaurant_id;
}

async function newInfo(data, id)
{
    const rawQuery =
        "INSERT INTO `glutenMaps`.`restaurant_infos` (`restaurant_id`, `address`, `google_maps_id`) VALUES (\"" +
        id + '", "' +
        data.address + '", "' +
        data.google_maps_id + '" ' +
        ")";
    await sequelize
        .query(rawQuery)
        .catch(err =>
        {
            throw (err.message)
        })
}

module.exports = async data =>
{
    await newInfo(data, await newMarker(data));
}