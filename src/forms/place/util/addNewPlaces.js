const addPlace = require('./addPlace');
const addImage = require('./missingInfo/upload');
const fetch = require('../../../helpers/easyFetch');
const addDescriptionToDB = require('./missingInfo/description')
const
{
    formatPlace
} = require('./missingInfo/formatItems');

async function addCompletePlacesToDB(placeList)
{
    let formattedPlace;
    for (let i = 0, len = placeList.length; i < 1; i++)
    {
        formattedPlace = formatPlace(placeList[i]);
        addPlace(formattedPlace);
    }
}

async function uploadImagesToCDN(placeList)
{
    let photoRef;
    for (let i = 0, len = placeList.length; i < len; i++)
    {
        photoRef = placeList[i].photos[0].photo_reference;
        addImage(photoRef, placeList[i].place_id);
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

async function addDescriptionsToDB(placeList)
{
    for (let i = 0, len = placeList.length; i < len; i++)
        addDescriptionToDB(placeList[i].place_id);
}

module.exports = async placeList =>
{
    await addMissingInfo(placeList);
    await addCompletePlacesToDB(placeList);
    await uploadImagesToCDN(placeList);
    addDescriptionsToDB(placeList);
}