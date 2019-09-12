const expect = require('chai').expect;
const sequelize = require('../../src/database/connect');
const fetch = require('../helpers/easyFetch');
const url = "http://Miless-MacBook-Pro.local:8081/getRestaurants";
const nearbyPlaces = require('./util/placeList');
const
    {
        msleep
    } = require('sleep');

async function deletePlaces() {
    await sequelize
        .query('DELETE FROM restaurant_infos;');
    await sequelize
        .query('DELETE FROM restaurants;');
}

async function getPlaces() {
    return await sequelize
        .query("select * from `restaurant_infos`")
        .catch(err => {
            throw err;
        })
        .then(res => {
            return res[0];
        })
}

function objContainsNull(obj) {
    for (let key in obj)
        if (obj[key] === null)
            return true;
    return false;
}

describe('get places', function () {
    it("should get places from Google Maps and add them to DB", async function () {
        await deletePlaces();
        const loc = {
            lat: 41.02444534,
            lng: -72.48165237
        }
        const placesFromDB = await getPlaces();
        expect(0).to.be.equal(placesFromDB.length);
        const res = await fetch(url, loc);
        expect(12).to.be.lessThan(res.length);
    })
    it('should check if places are in db', async function () {
        await msleep(2000);
        const placesFromDB = await getPlaces();
        const place = placesFromDB[0];
        delete place.description; // sometimes this will  be null so I don'r want it to interfere
        expect(false).to.be.equal(objContainsNull(place));
    });
});