const editUser = require("./editUser");
const register = require("./register");
const login = require("./login");
const getUserInfo = require("./getUserInfo");
const getPlaces = require('./getRestaurants');
const getPlaceInfo = require('./getPlaceInfo');
module.exports = app =>
{
    getPlaceInfo(app);
    register(app);
    login(app);
    getUserInfo(app);
    editUser(app);
    getPlaces(app);
};