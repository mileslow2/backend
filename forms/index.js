const editUser = require("./editUser");
const register = require("./register");
const login = require("./login");
const getUserInfo = require("./getUserInfo");

module.exports = (app, con) => {
  register(app, con);
  login(app, con);
  getUserInfo(app, con);
  editUser(app, con);
};
