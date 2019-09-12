const restaurants = require("../../../database/models/restaurants");
const sequelize = require("../../../database/connect");

async function newMarker(data) {
    const marker = {
        lat: data.lat,
        lng: data.lng,
        name: data.name
    }
    var restaurant_id;
    await restaurants
        .create(marker)
        .catch(err => {
            throw (err)
        })
        .then(res => {
            restaurant_id = res.dataValues.restaurant_id
        })
    return restaurant_id;
}


async function newInfo(data, id) {
    data.phoneNumber = parseInt(data.phoneNumber)
    const rawQuery =
        "INSERT INTO `glutenMaps`.`restaurant_infos`" +
        " (`restaurant_id`, `address`, `google_maps_id`, " +
        "`phone_number`, `hours`) VALUES (\"" +
        id + '", "' +
        data.address + '", "' +
        data.googleMapsID + '", "' +
        data.phoneNumber + '", "' +
        data.hours + '" ' +
        ")";
    await sequelize
        .query(rawQuery)
        .catch(err => {
            throw (err)
        })
}

module.exports = async data => {
    await newInfo(data, await newMarker(data));
}