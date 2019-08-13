const fetch = require('node-fetch');
const addMissingInfo = require('./addMissingInfo');

function makeParam(param, value)
{
    return param + "=" + value + "&";
}

function makeURL(loc)
{
    let googleMapRequest =
        "https://maps.googleapis.com/maps/api/place/textsearch/json?";
    googleMapRequest += makeParam("input", "gluten-free");
    googleMapRequest += makeParam("inputtype", "textquery");
    googleMapRequest += makeParam("location", loc.latitude + "," + loc.longitude);
    googleMapRequest += makeParam("radius", "1");
    googleMapRequest += makeParam(
        "key",
        process.env.googleMapsAPIKey
    );
    googleMapRequest = googleMapRequest.slice(0, -1); //removes the & from the end
    return googleMapRequest
}


module.exports = async loc =>
{
    const url = makeURL(loc);
    return await fetch(url)
        .then(res => res.json())
        .then(res =>
        {
            return res.results;
        });


}