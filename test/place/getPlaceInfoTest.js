const expect = require("chai").expect;
const easyFetch = require('../helpers/easyFetch');
const url = "http://Miless-MacBook-Pro.local:8081/getPlaceInfo";
const seq = require('../../src/database/connect');

function turnKeysToString(obj)
{
    for (let key in obj)
        if (typeof obj[key] != "string")
            obj[key] = obj[key].toString();
    return obj
}

async function makeExpectedResponse()
{
    return await seq
        .query("select `restaurant_id`, `address`, `google_maps_id` from restaurant_infos limit 1;")
        .then(res =>
        {

            return turnKeysToString(res[0][0]);
        })
}

describe("get place info", function()
{
    it.only("should get the right place info", async function()
    {
        let expectedRes = await makeExpectedResponse();
        const body = {
            id: expectedRes.restaurant_id
        };
        const res = await easyFetch(url, body);
        console.log('====================================');
        console.log(res);
        console.log('====================================');
        // expect(expectedRes).to.deep.equal(res)
    });
    it("should result in false because of wrong id", async function()
    {
        const id = 1 + "";
        const body = {
            id
        };
        const response = await easyFetch(url, body);
        expect(response).to.be.equal(false);
    });
    it("should result in false because bad id", async function()
    {
        const id = "hello";
        const body = {
            id
        };
        const response = await easyFetch(url, body);
        expect(response).to.be.equal(false);
    });
});