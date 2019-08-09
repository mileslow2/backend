const restaurant_info = require("../../database/models/restaurant_info");
const usedDefense = require("../../security");

function infoQuery(restaurant_id)
{
    return {
        where:
        {
            restaurant_id
        },
        attributes: ["description", "address", "phone_number", "restaurant_hours", "google_maps_id"]
    };
}
async function getPlaceInfo(restaurant_id)
{
    var info;
    const fromRestaurantID = infoQuery(restaurant_id);
    await restaurant_info
        .findOne(fromRestaurantID)
        .catch(errorHandler)
        .then(results =>
        {
            if (results == null)
                info = null;
            else
                info = results.dataValues;
        })
    return info;
}

async function getMissingInfo(googleMapsID)
{
    const description = await getDescriptionFrom(googleMapsID);
    const otherMissingInfo = await getExtraInfo(googleMapsID);
    let missingInfo = otherMissingInfo;
    missingInfo.description = description;
    return missingInfo;
}

module.exports = async app =>
{
    const placeInfoKeys = ["id"]
    var info, body;
    app.post("/getPlaceInfo", async (req, res) =>
    {
        if (await usedDefense(req, res, placeInfoKeys)) return;
        info = await getPlaceInfo(req.body.id);
        if (info === null)
            info = {
                err: "can't find the place you are looking for"
            }
        res.status(200).send(info);
    })
}