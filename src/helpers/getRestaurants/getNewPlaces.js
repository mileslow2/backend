const fetch = require('node-fetch');
const addRestaurant = require('./addMarker');
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

function removeUnnecessaryInfo(places)
{
    for (var i = 0; i < places.length; i++)
    {
        delete places[i].plus_code;
        delete places[i].price_level;
        delete places[i].types;
        delete places[i].icon;
        delete places[i].user_ratings_total;
        delete places[i].photos[0].html_attributions;
        delete places[i].photos[0].height;
        delete places[i].photos[0].width;
        delete places[i].geometry.viewport;
        delete places[i].geometry.southwest;
    }
    return places;
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
    newPlaces = removeUnnecessaryInfo(newPlaces);
    return newPlaces;
}