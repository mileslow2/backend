const loginSignup = require('./loginSignup');
const place = require('./place');
const user = require('./user');

module.exports = app =>
{
    loginSignup(app);
    place(app);
    user(app);
};