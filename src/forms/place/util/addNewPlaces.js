const addPlace = require('./addPlace');

function formatHours(opening_hours)
{
    return opening_hours
}

module.exports = async listOfPlaces =>
{
    var formattedPlace;
    listOfPlaces.forEach(async place =>
    {
        formattedPlace = {
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng,
            address: place.formatted_address,
            name: place.name,
            google_maps_id: place.place_id,
            phone_number: place.formatted_phone_number,
        }
        await addPlace(formattedPlace);
    });
}