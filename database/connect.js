const Sequelize = require("./node_modules/Sequelize");

const sequelize = new sequelize("glutenMaps", "root", "123", {
  host: "localhost",
  dialect: "mysql"
});

module.exports = sequelize;
global.sequelize = sequelize;
