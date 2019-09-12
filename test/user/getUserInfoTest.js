const expect = require("chai").expect;
const easyFetch = require('../helpers/easyFetch');
const URL = "http://Miless-MacBook-Pro.local:8081/getUserInfo";
const user = require("../../src/database/models/user");

describe("get user info", function () {
    it("should get user info", async function () {
        const body = {
            id: "14"
        }
        const res = await easyFetch(URL, body);
        const expectedRes = {
            email: "mileslow3@gmail.com",
            first_name: "miles",
            last_name: "low"
        }
        expect(res).to.deep.equal(expectedRes);
    })
    it("shouldn't get user info because of bad id", async function () {
        const body = {
            id: 9
        }
        const res = await easyFetch(URL, body);
        const expectedRes = false;
        expect(expectedRes).to.be.equal(res);
    })
    it("shouldn't get user info because of invalid request", async function () {
        const invalidBody = {};
        const res = await easyFetch(URL, invalidBody);
        expect(res).to.be.equal(false);
    })
    it("shouldn't get user info because of invalid request", async function () {
        const body = {
            id: undefined
        }
        const res = await easyFetch(URL, body);
        const expectedRes = false;
        expect(res).to.be.equal(expectedRes);
    })
})