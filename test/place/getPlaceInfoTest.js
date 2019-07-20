const expect = require("chai").expect;
const easyFetch = require("../../src/helpers/easyFetch");
const url = "http://Miless-MacBook-Pro.local:8081/getPlaceInfo";
const getPlaceID = require("../helpers/getPlaceID");
describe("get place info", function()
{
    it("should get the right place info", async function()
    {
        const expectedResponse = {
            google_maps_id: "ChIJ164AL6fy6IkRIVz6x2wafWk",
            address: "9 Ponquogue Ave, Hampton Bays, NY 11946, USA",
        };
        const id = await getPlaceID(expectedResponse.google_maps_id) + "";
        const body = {
            id
        };
        const response = await easyFetch(url, body);
        expect(expectedResponse.google_maps_id).to.be.equal(response.google_maps_id);
        expect(expectedResponse.address).to.be.equal(response.address);
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