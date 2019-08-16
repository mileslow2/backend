const expect = require("chai").expect;
const easyFetch = require("../helpers/easyFetch");
const loginURL = "http://Miless-MacBook-Pro.local:8081/login";
const tokenInDB = require('./util/tokenInDB');

describe("login", function()
{
    it("response should have a token and userID", async function()
    {
        const userData = {
            email: "mileslow4@gmail.com",
            password: "123"
        };
        const res = await easyFetch(loginURL, userData);
        const hasToken = res.hasOwnProperty('token');
        const hasUserID = res.hasOwnProperty('user_id');
        expect(true).to.be.equal(hasToken);
        expect(true).to.be.equal(hasUserID);
    });
    it("new token should be in DB", async function()
    {
        const tokenExists = await tokenInDB("26");
        expect(true).to.be.equal(tokenExists);
    });
    // it("should not login because of incorrect email", async function()
    // {
    //     const userData = {
    //         email: "mileslow9@gmail.com",
    //         password: "123"
    //     };
    //     const response = await easyFetch(loginURL, userData);
    //     const expectedResponse = {
    //         verified: false
    //     };
    //     expect(expectedResponse).to.deep.equal(response);
    // });
    // it("should not login because of bad request", async function()
    // {
    //     const userData = {};
    //     const response = await easyFetch(loginURL, userData);
    //     expect(response).to.deep.equal(false);
    // });
});