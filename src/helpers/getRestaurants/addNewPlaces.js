const addPlace = require('./addMarker');

module.exports = async listOfPlaces =>
{
    listOfPlaces = listOfPlaces.results;
    await listOfPlaces.forEach(async place =>
    {
        await addPlace(place);
    });
}