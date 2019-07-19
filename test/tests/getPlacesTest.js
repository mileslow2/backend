const changeDecimal = require("../../src/helpers/getRestaurants/changeDecimals");
const expect = require('chai').expect;
const sequelize = require('../../src/database/connect');
const fetch = require('../../src/helpers/easyFetch');
const url = "http://Miless-MacBook-Pro.local:8081/getRestaurants";
const nearbyPlaces = require('../helpers/getPlacesTest');
const nearbyPlacesQuery = require('../../src/helpers/getRestaurants/nearbyPlacesQuery');


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
        .catch(err => (console.log(err.message)))
        .then(res =>
        {
            nearbyPlaces = res[0];
        })
    return nearbyPlaces;
}

describe('get places', function()
{


    it("should get places from Google Maps and add them to DB", async function()
    {
        await deletePlaces();
        const loc = {
            lat: 41.02444534,
            lng: -72.48165237
        }
        var placesFromDB = await getNearbyPlaces(loc);
        expect(0).to.be.equal(placesFromDB.length);
        const res = await fetch(url, loc);
        expect(12).to.be.lessThan(res.length);
        await setTimeout(async () =>
        {
            placesFromDB = await getNearbyPlaces(loc);
            expect(12).to.be.lessThan(placesFromDB.length);
        }, 1000)


    })
    it("should get places from db", async function()
    {
        const loc = {
            lat: 41.02444534,
            lng: -72.48165237
        }
        loc.lat = loc.lat.toString();
        loc.lng = loc.lng.toString();
        const res = await fetch(url, loc);
        expect(13).to.be.lessThan(res.length);
    });
    it("should not get any places because of crazy locations", async function()
    {
        const crazyLoc = {
            lat: "742.4343243442421421434134",
            lng: "742.4343243442421421434134"
        }
        const res = await fetch(url, crazyLoc);
        expect(false).to.be.equal(res);

    })
    it("should not get any places because of bad location object", async function()
    {
        const crazyLoc = {
            lat: "foo",
            lng: "742.4343243442421421434134"
        }
        const res = await fetch(url, crazyLoc);
        expect(false).to.be.equal(res);
    })
});