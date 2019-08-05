const expect = require('chai').expect;
const fetch = require('../../src/helpers/easyFetch');
const url = 'http://Miless-MacBook-Pro.local:8081/getPlaceInfo';

describe('jwt testing', function()
{
    it('Should not work because of invalid JWT ', async function()
    {
        const body = {
            id: 2449
        }
        const res = await fetch(url, body);
        expect(false).to.be.equal(res);
    })
})