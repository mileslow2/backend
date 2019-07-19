const fetch = require('node-fetch');
const addRestaurant = require('./addPlace');
const changeDecimals = require('./changeDecimals')

function makeParam(param, value)
{
    return param + "=" + value + "&";
}

function makeURL(loc)
{
    var googleMapRequest =
        "https://maps.googleapis.com/maps/api/place/textsearch/json?";
    googleMapRequest += makeParam("input", "gluten-free");
    googleMapRequest += makeParam("inputtype", "textquery");
    googleMapRequest += makeParam("location", loc.latitude + "," + loc.longitude);
    googleMapRequest += makeParam("radius", "1");
    googleMapRequest += makeParam(
        "key",
        "AIzaSyCtRB-B5BY8RKRrM7oMQAiQirxIU4EMr4M"
    );
    googleMapRequest = googleMapRequest.slice(0, -1); //removes the & from the end
    return googleMapRequest
}

module.exports = async loc =>
{
    const url = makeURL(loc);
    var newPlaces;
    await fetch(url)
        .then(res => res.json())
        .then(async res =>
        {
            newPlaces = res;
        });
    return newPlaces;
}