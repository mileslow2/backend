const expect = require("chai").expect;
const easyFetch = require('../helpers/easyFetch');
const user = require('../../src/database/models/user')
const url = "http://Miless-MacBook-Pro.local:8081/editUser";

function fixUser()
{
    const selector = {
        where:
        {
            user_id: "14"
        }
    }
    const valuesToSelect = {
        email: "mileslow3@gmail.com",
        first_name: "miles",
        last_name: "low"
    }
    user
        .update(valuesToSelect, selector)
        .catch(err =>
        {
            throw err;
        });
}

describe("edit user info", function()
{
    it("should edit user info", async function()
    {
        const body = {
            id: "14",
            password: "123",
            email: "mileslow3@gmail.com",
            first_name: "smiles",
            last_name: "slow"
        }
        const response = await easyFetch(url, body);
        expect(response).to.be.equal(true);
        await fixUser();
    })

    it("should not edit user info because of bad user id", async function()
    {
        const body = {
            id: "9",
            password: "123",
            email: "mileslow3@gmail.com",
            first_name: "smiles",
            last_name: "slow"
        }
        const response = await easyFetch(url, body);
        expect(response).to.be.equal(false);
    })

    it("should not edit user info because there is no password", async function()
    {
        const body = {
            id: "9",
            email: "mileslow3@gmail.com",
            first_name: "smiles",
            last_name: "slow"
        }
        const response = await easyFetch(url, body);
        expect(response).to.be.equal(false);
    })
})