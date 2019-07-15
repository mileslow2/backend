const fetch = require('node-fetch')
const addMarker = require('./src/helpers/addMarker')

function makeParam(param, value)
{
    return param + "=" + value + "&";
}

function getEightDigits(int)
{
    int = parseInt(int.toString().replace(".", ""));
    while (int.toString().length > 9)
        int = Math.round(int / 9);
    return int;
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
                    lat: getEightDigits(c.geometry.location.lat),
                    lng: getEightDigits(c.geometry.location.lng),
                    address: c.formatted_address,
                    name: c.name,
                    google_maps_id: c.place_id
                }
                await addMarker(data);
            }
        });
}

run();