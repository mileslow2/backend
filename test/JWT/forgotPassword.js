const expect = require('chai').expect;
const fetch = require('../helpers/easyFetch');
const url = 'http://Miless-MacBook-Pro.local:8081/forgotPassword';
const user = require('../../src/database/models/user');

describe('jwt testing', function () {
    it('send me an email', async function () {
        const body = {
            email: "mileslow2@gmail.com"
        };
        await fetch(url, body);
        // email works
    });
})