const addPlace = require('./addMarker');

module.exports = async listOfPlaces =>
{
    await listOfPlaces.forEach(async place =>
    {
        await addPlace(place);
    });
}