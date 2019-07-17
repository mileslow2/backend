const sequelize = require('../database/connect');
const nearbyPlacesQuery = require('../helpers/getRestaurants/nearbyPlacesQuery');
const addNewPlaces = require('../helpers/getRestaurants/addNewPlaces');
const getNewPlaces = require('../helpers/getRestaurants/getNewPlaces');

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
    var nearbyPlaces, loc, newPlaces;
    app.post("/getRestaurants", async (req, res) =>
    {
        loc = req.body;
        nearbyPlaces = await getNearbyPlaces(loc);
        console.log('====================================');
        console.log("yuh");
        console.log('====================================');
        nearbyPlaces = JSON.stringify(nearbyPlaces);
        if (nearbyPlaces.length < 14)
        {
            newPlaces = await getNewPlaces(loc);
            nearbyPlaces = nearbyPlaces.concat(newPlaces);
            res.status(200).end(nearbyPlaces);
            await addNewPlaces(newPlaces);
        }
        else res.status(200).end(nearbyPlaces);
    })
}