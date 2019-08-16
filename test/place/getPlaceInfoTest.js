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
    const query = "select * from restaurant_infos limit 1;";
    return await seq
        .query(query)
        .then(res =>
        {
            return turnKeysToString(res[0][0]);
        })
}

describe("get place info", function()
{
    it("should get the right place info", async function()
    {
        let expectedRes = await makeExpectedResponse();
        const body = {
            id: expectedRes.restaurant_id
        };
        const res = await easyFetch(url, body);
        delete expectedRes.restaurant_id;
        expect(expectedRes).to.deep.equal(res)
    });
    it("should result in false because of wrong id", async function()
    {
        const id = 1 + "";
        const body = {
            id
        };
        const res = await easyFetch(url, body);
        const isErr = res.hasOwnProperty("err");
        expect(true).to.be.equal(isErr);
    });
    it("should result in false because bad id", async function()
    {
        const id = "hello";
        const body = {
            id
        };
        const res = await easyFetch(url, body);
        const isErr = res.hasOwnProperty("err");
        expect(isErr).to.be.equal(true);
    });
});