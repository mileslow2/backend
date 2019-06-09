const editUser = require("./forms/editUser");
const register = require("./forms/register");
const login = require("./forms/login");
const getUserInfo = require("./forms/getUserInfo");

module.exports = (app, con) => {
  register(app, con);
  login(app, con);
  getUserInfo(app, con);
  editUser(app, con);
};
