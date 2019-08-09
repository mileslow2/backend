const fetch = require('node-fetch');
const addImage = require('./missingInfo/upload');
const htmlescape = require('htmlescape');

function getPlaceDetails(google_maps_id)
{
    let url = "https://maps.googleapis.com/maps/api/place/details/json?";
    url += "placeid=" + google_maps_id;
    url += "&fields=" + "formatted_phone_number,opening_hours,website";
    url += "&key=" + process.env.googleMapsAPIKey;
    console.log('====================================');
    console.log(url);
    console.log('====================================');
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
    // const description = await getDescription(placeDetails);
    // placeDetails.description = description;
    const photoRef = place.photos[0].photo_reference;
    await addImage(photoRef, google_maps_id);
    return placeDetails;
}