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

function addCompletePlacesToDB(placeList)
{
    for (let i = 0, len = placeList.length; i < len; i++)
        addPlace(placeList[i]);
}

async function uploadImagesToCDN(placeList)
{
    let photoRef;
    for (let i = 0, len = placeList.length; i < len; i++)
    {
        photoRef = placeList[i].photos[0].photo_reference;
        addImage(photoRef, placeList[i].googleMapsID);
    }
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
    let google_maps_id, placeDetails;
    for (let i = 0, len = placeList.length; i < len; i++)
    {
        google_maps_id = placeList[i].place_id;
        placeDetails = await fetchPlaceDetails(google_maps_id);
        Object.assign(placeList[i], placeDetails);
    }
}

module.exports = async placeList =>
{
    await addMissingInfo(placeList);
    await formatList(placeList);
    await addCompletePlacesToDB(placeList);
    uploadImagesToCDN(placeList);
    addDescriptionsToDB(placeList);
}