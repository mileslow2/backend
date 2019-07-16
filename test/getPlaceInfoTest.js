const expect = require("chai").expect;
const easyFetch = require("../src/helpers/easyFetch");
const url = "http://Miless-MacBook-Pro.local:8081/getPlaceInfo";

describe("login", function()
{
    it("should get the right place info", async function()
    {
        const body = {
            id: 31
        };
        const response = await easyFetch(url, body);

        const expectedResponse = {
            google_maps_id: "ChIJ164AL6fy6IkRIVz6x2wafWk",
            address: "9 Ponquogue Ave, Hampton Bays, NY 11946, USA",
        };
        expect(expectedResponse.google_maps_id).to.be.equal(response.google_maps_id);
        expect(expectedResponse.address).to.be.equal(response.address);
    });
});