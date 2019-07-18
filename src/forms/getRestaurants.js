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

module.exports = async app =>
{
    const keys = ["lat", "lng"];
    var nearbyPlaces, loc, newPlaces;
    app.post("/getRestaurants", async (req, res) =>
    {
        if (usedDefense(req, res, keys)) return;
        loc = req.body;
        nearbyPlaces = await getNearbyPlaces(loc);
        nearbyPlaces = JSON.stringify(nearbyPlaces);
        if (nearbyPlaces.length < 15)
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