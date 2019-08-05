const expect = require('chai').expect;
const fetch = require('../../src/helpers/easyFetch');
const url = 'http://Miless-MacBook-Pro.local:8081/';

describe('jwt testing', function()
{
    it('Should not work because of invalid JWT ', async function()
    {
        const body = {
            id: 2449
        }
        const res = await fetch(url + "getPlaceInfo", body);
        expect(false).to.be.equal(res);
    })
    it('should login', async function()
    {
        const userData = {
            email: "mileslow4@gmail.com",
            password: "123"
        };
        const res = await fetch(url + "login", userData);
        expect(26).to.be.equal(res.user_id)
        expect(undefined).to.not.be.equal(res.token);
    })
})