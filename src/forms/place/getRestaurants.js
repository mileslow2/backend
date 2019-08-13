const addNewPlacesToDB = require('./util/addNewPlaces');
const getNewPlaces = require('./util/getNewPlaces');
const usedDefense = require("../../security");
const nearbyPlacesQuery = require('./util/nearbyPlacesQuery');
const sequelize = require('../../database/connect');

function locToString(req)
{
    if (req.body["lat"] != undefined &&
        req.body["lng"] != undefined)
    {
        req.body.lat = req.body.lat.toString();
        req.body.lng = req.body.lng.toString();
    }
    return req;
}

async function getNearbyPlaces(loc)
{
    var nearbyPlaces = nearbyPlacesQuery(loc);
    await sequelize
        .query(nearbyPlaces)
        .catch((err) => (console.log(err.message)))
        .then(res =>
        {
            nearbyPlaces = res[0];
        })
    return nearbyPlaces;
}

function locIsValid(loc, res)
{
    const lat = parseFloat(loc.lat);
    const lng = parseFloat(loc.lng);
    const locIsValid = (
        -90 < lat && lat < 90 &&
        -180 < lng && lng < 180
    );
    if (!locIsValid)
        res.status(400).end("false");
    return locIsValid;
}

module.exports = async app =>
{
    const keys = ["lat", "lng"];
    let nearbyPlaces, loc, newPlaces;
    app.post("/getRestaurants", async (req, res) =>
    {
        req = locToString(req);
        loc = req.body;
        if (await usedDefense(req, res, keys) ||
            !locIsValid(loc, res)) return;
        nearbyPlaces = await getNearbyPlaces(loc);
        if (nearbyPlaces.length < 10)
        {
            newPlaces = await getNewPlaces(loc);
            nearbyPlaces = nearbyPlaces.concat(newPlaces);
            nearbyPlaces = JSON.stringify(nearbyPlaces);
            res.status(200).end(nearbyPlaces);
            addNewPlacesToDB(newPlaces, loc);
        }
        else res.status(200).end(nearbyPlaces);
    })
}