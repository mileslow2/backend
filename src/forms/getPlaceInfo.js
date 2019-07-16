const restaurant_info = require("../database/models/restaurant_info");


function infoQuery(restaurant_id)
{
    return {
        where:
        {
            restaurant_id
        },
        attributes: ["description", "average", "address", "phone_number", "restaurant_hours", "google_maps_id"]
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
            info = results.dataValues;
            console.log('====================================');
            console.log(info);
            console.log('====================================');
        })
    return info;
}

async function getMissingInfo(googleMapsID)
{
    const description = await getDescriptionFrom(googleMapsID);
    const otherMissingInfo = await getExtraInfo(googleMapsID);
    var missingInfo = otherMissingInfo;
    missingInfo.description = description;
    return missingInfo;
}

module.exports = async app =>
{
    var info, extraInfo;
    app.post("/getPlaceInfo", async (req, res) =>
    {
        info = await getPlaceInfo(req.body.id);
        // if (info["restaurant_hours"] == null)
        // {
        //     extraInfo = await getMissingInfo(info.google_maps_id);
        //     Object.assign(info, extraInfo);
        // }
        // info = JSON.stringify(info)
        res.status(200).send(info);
    })
}