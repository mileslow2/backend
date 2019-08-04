const loginSignup = require('./loginSignup');
const place = require('./place');
const user = require('./user');
const review = require('./review');

module.exports = app =>
{
    loginSignup(app);
    place(app);
    user(app);
    review(app);
};