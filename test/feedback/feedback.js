const expect = require('chai').expect;
const fetch = require('../helpers/easyFetch');
const url = 'http://Miless-MacBook-Pro.local:8081/feedback';

describe('feedback email testing', function () {
    it('should email me the feedback', async function () {
        const body = {
            subject: "foo",
            email: "mileslow2@gmail.com",
            body: "The other guys is a hidden gem, you should watch it!"
        }
        fetch(url, body);
        //it works
    });
})