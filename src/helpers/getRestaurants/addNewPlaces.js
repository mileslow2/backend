const addPlace = require('./addPlace');

module.exports = async listOfPlaces =>
{
    var formattedPlace;
    listOfPlaces = listOfPlaces.results;
    await listOfPlaces.forEach(async place =>
    {
        formattedPlace = {
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng,
            address: place.formatted_address,
            name: place.name,
            google_maps_id: place.place_id
        }
        await addPlace(formattedPlace);
    });
}