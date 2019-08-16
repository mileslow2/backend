const addPlace = require('./addPlace');
const addImage = require('./missingInfo/upload');
const fetch = require('../../../helpers/easyFetch');
const addDescriptionsToDB = require('./missingInfo/description')
const
{
    formatPlace
} = require('./missingInfo/formatItems');

function formatList(placeList)
{
    for (let i = 0, len = placeList.length; i < len; i++)
        placeList[i] = formatPlace(placeList[i]);
}

async function addCompletePlacesToDB(placeList)
{
    await Promise.all(
        placeList.map(addPlace)
    );
}

async function uploadImagesToCDN(placeList)
{
    await Promise.all(
        placeList.map(async place =>
        {
            const photoRef = place.photos[0].photo_reference;
            await addImage(photoRef, place.googleMapsID);
        })
    );
}

function fetchPlaceDetails(google_maps_id)
{
    let url = "https://maps.googleapis.com/maps/api/place/details/json?";
    url += "placeid=" + google_maps_id;
    url += "&fields=" + "formatted_phone_number,opening_hours,url";
    url += "&key=" + process.env.googleMapsAPIKey;
    return fetch(url)
        .catch(err =>
        {
            throw (err.message);
        })
        .then(res =>
        {
            return res.result;
        });
}


async function addMissingInfo(placeList)
{
    await Promise.all(
        placeList.map(async listItem =>
        {
            const google_maps_id = listItem.place_id;
            const placeDetails = await fetchPlaceDetails(google_maps_id);
            Object.assign(listItem, placeDetails);
        })
    );
}

module.exports = async placeList =>
{
    await addMissingInfo(placeList);
    formatList(placeList);
    await addCompletePlacesToDB(placeList);
    uploadImagesToCDN(placeList);
    addDescriptionsToDB(placeList);
}