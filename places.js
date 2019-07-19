const fetch = require('node-fetch');
const addPlace = require('./src/helpers/getRestaurants/addPlace');

function makeParam(param, value)
{
    return param + "=" + value + "&";
}

function removeDigits(decimal, finalLength)
{
    var str = decimal.toString()
    while (str.length > finalLength)
        str = str.substr(0, str.length - 1);
    return str;
}


async function run()
{

    const loc = {
        latitude: 41.02444986511796,
        longitude: -72.4816286306909
    }

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

    fetch(googleMapRequest)
        .then(res => res.json())
        .then(async res =>
        {
            var data, c;
            for (var i in res.results)
            {
                c = res.results[i];
                data = {
                    lat: removeDigits(c.geometry.location.lat, 10),
                    lng: removeDigits(c.geometry.location.lng, 11),
                    address: c.formatted_address,
                    name: c.name,
                    google_maps_id: c.place_id
                }
                await addPlace(data);
            }
        });
}

run();