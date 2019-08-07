const verification = require('./verification');
const register = require("./register");
const login = require("./login");

module.exports = app =>
{
    verification(app);
    register(app);
    login(app);
}