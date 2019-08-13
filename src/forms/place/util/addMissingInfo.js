const fetch = require('node-fetch');
const getDescription = require('./missingInfo/description');

function getPlaceDetails(google_maps_id)
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
            return res.json();
        })
}

module.exports = async place =>
{
    const google_maps_id = place.place_id;
    let placeDetails = await getPlaceDetails(google_maps_id);
    placeDetails = placeDetails.result;
    // const description = await getDescription(placeDetails.url);
    placeDetails.description = "hello";

    return placeDetails;
}