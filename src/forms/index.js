const editUser = require("./editUser");
const register = require("./register");
const login = require("./login");
const getUserInfo = require("./getUserInfo");

module.exports = app => {
  register(app);
  login(app);
  getUserInfo(app);
  editUser(app);
};
