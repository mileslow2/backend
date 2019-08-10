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
        .then(async res =>
        {
            let newPlaces = res.results;
            console.time("the whole thing");
            for (let i = 0, len = newPlaces.length; i < len; i++)
            {
                console.log('====================================');
                console.log("begin restaurant");
                console.log('====================================');
                console.time("new restaurant");
                const missing = await addMissingInfo(newPlaces[i]);
                Object.assign(newPlaces[i], missing);
                console.timeEnd("new restaurant");
            }
            console.timeEnd("the whole thing");
            return newPlaces;
        });


}