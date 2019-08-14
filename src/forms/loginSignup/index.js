const verification = require('./verification');
const register = require("./register");
const login = require("./login");
const passwordStuff = require('./forgotPassword');
module.exports = app =>
{
    passwordStuff(app);
    verification(app);
    register(app);
    login(app);
}