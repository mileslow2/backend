const sequelize = require('../database/connect');
const nearbyPlacesQuery = require('../helpers/getRestaurants/nearbyPlacesQuery');
const addNewPlaces = require('../helpers/getRestaurants/addNewPlaces');
const getNewPlaces = require('../helpers/getRestaurants/getNewPlaces');
const usedDefense = require("../security");

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

function locIsValid(loc, res)
{
    const lat = parseFloat(loc.lat);
    const lng = parseFloat(loc.lng)
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
    var nearbyPlaces, loc, newPlaces;
    app.post("/getRestaurants", async (req, res) =>
    {
        req = locToString(req);
        loc = req.body;
        if (usedDefense(req, res, keys) ||
            !locIsValid(loc, res)) return;
        nearbyPlaces = await getNearbyPlaces(loc);
        nearbyPlaces = JSON.stringify(nearbyPlaces);
        if (nearbyPlaces.length < 10)
        {
            newPlaces = await getNewPlaces(loc);
            nearbyPlaces = nearbyPlaces.concat(newPlaces);
            nearbyPlaces = JSON.stringify(nearbyPlaces);
            res.status(200).end(nearbyPlaces);
            await addNewPlaces(newPlaces, loc);
        }
        else res.status(200).end(nearbyPlaces);
    })
}