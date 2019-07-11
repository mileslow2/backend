const expect = require("chai").expect;
const easyFetch = require("../src/helpers/easyFetch");
const URL = "http://Miless-MacBook-Pro.local:8081/getUserInfo";

describe("get user info", function()
{
    it("should get user info", async function()
    {
        const body = {
            id: "14"
        }
        const res = await easyFetch(URL, body);
        const expectedRes = {
            email: "mileslow2@gmail.com",
            first_name: "miles low",
            last_name: ""
        }
        expect(expectedRes).to.deep.equal(res);
    })
    it("shouldn't get user info because of bad id", async function()
    {
        const body = {
            id: 9
        }
        const res = await easyFetch(URL, body);
        const expectedRes = false;
        expect(expectedRes).to.be.equal(res);
    })
    it("shouldn't get user info because of invalid request", async function()
    {
        const body = "foo"
        const res = await easyFetch(URL, body);
        const expectedRes = false;
        expect(expectedRes).to.be.equal(res);
    })
    it("shouldn't get user info because of invalid request", async function()
    {
        const body = {}
        const res = await easyFetch(URL, body);
        const expectedRes = false;
        expect(expectedRes).to.be.equal(res);
    })
    it("shouldn't get user info because of invalid request", async function()
    {
        const body = {
            id: undefined
        }
        const res = await easyFetch(URL, body);
        const expectedRes = false;
        expect(expectedRes).to.be.equal(res);
    })
})