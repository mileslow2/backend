const expect = require("chai").expect;
const easyFetch = require("../helpers/easyFetch");
const loginURL = "http://Miless-MacBook-Pro.local:8081/login";

describe("login", function()
{
    // only works with real emails

    // it.only("should login", async function()
    // {
    //     const userData = {
    //         email: "mileslow4@gmail.com",
    //         password: "123"
    //     };
    //     const response = await easyFetch(loginURL, userData);

    //     const expectedResponse = {
    //         verified: true,
    //         user_id: 26
    //     };
    //     expect(expectedResponse).to.deep.equal(response);
    // });
    // it("should not login because of incorrect password", async function()
    // {
    //     const userData = {
    //         email: "mileslow4@gmail.com",
    //         password: "567"
    //     };
    //     const response = await easyFetch(loginURL, userData);
    //     const expectedResponse = {
    //         verified: false
    //     };
    //     expect(expectedResponse).to.deep.equal(response);
    // });
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