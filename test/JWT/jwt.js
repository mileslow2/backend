const expect = require('chai').expect;
const fetch = require('../helpers/easyFetch');
const url = 'http://Miless-MacBook-Pro.local:8081/register';
const user = require('../../src/database/models/user');

async function deleteUser(email)
{
    await user
        .destroy(
        {
            where:
            {
                email
            }
        })
        .catch(err =>
        {
            throw (err)
        })
}

describe('jwt testing', function()
{
    it('should email user trying to register', async function()
    {
        const newUser = {
            first_name: "miles",
            last_name: "low",
            email: "mileslow2@gmail.com",
            password: "123"
        }
        await deleteUser(newUser.email);
        const res = await fetch(url, newUser);
        expect(true).to.be.equal(res);
        //email works
    })

})