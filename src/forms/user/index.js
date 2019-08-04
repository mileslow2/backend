const getUserInfo = require("./getUserInfo");
const editUser = require("./editUser");

module.exports = app =>
{
    editUser(app);
    getUserInfo(app);
}