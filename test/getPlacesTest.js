const changeDecimal = require("../src/helpers/getRestaurants/changeDecimals");
const expect = require('chai').expect;
const sequelize = require('../src/database/connect');
const fetch = require('../src/helpers/easyFetch');
const url = "http://Miless-MacBook-Pro.local:8081/getRestaurants";
const nearbyPlaces = require('./helpers/getPlacesTest');
const nearbyPlacesQuery = require('../src/helpers/getRestaurants/nearbyPlacesQuery');


async function deletePlaces()
{
    await sequelize
        .query('DELETE FROM restaurant_infos;');
    await sequelize
        .query('DELETE FROM restaurants;');
}

async function getNearbyPlaces(loc)
{
    var nearbyPlaces = nearbyPlacesQuery(loc);
    await sequelize
        .query(nearbyPlaces)
        .catch(errorHandler)
        .then(res =>
        {
            nearbyPlaces = res[0];
        })
    return nearbyPlaces;
}

function removeID(placeList)
{
    var newObj = placeList
    for (var i = 0; i < placeList.length; i++)
    {
        delete newObj[i].restaurant_id;
        delete newObj[i].average;
    }
    return newObj;
}

describe('get places', function()
{
    const loc = {
        lat: changeDecimal(41.02444533642552, 8) + "",
        lng: changeDecimal(-72.48165236616808, 8) + ""
    }

    it("should get places from db", async function()
    {
        const res = await fetch(url, loc);
        expect(nearbyPlaces.length).to.be.equal(res.length);
    });
    // it("should get places from Google Maps and add them to DB", async function()
    // {
    //     await deletePlaces();
    // })
});