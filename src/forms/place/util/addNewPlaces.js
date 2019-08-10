const addPlace = require('./addPlace');

function castHoursToInt(opening_hours)
{
    return opening_hours
}

function format(place)
{
    return {
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng,
        address: place.formatted_address,
        name: place.name,
        google_maps_id: place.place_id,
        phone_number: place.formatted_phone_number,
        description: place.description,
        restaurant_hours: castHoursToInt(place.opening_hours)
    }
}

module.exports = async placeList =>
{
    let formattedPlace;
    for (let i = 0, len = placeList.length; i < len; i++)
    {
        formattedPlace = format(placeList[i]);
        await addPlace(formattedPlace);
    }
}