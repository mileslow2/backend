const Sequelize = require("sequelize");
const sequelize = require("../connect");

module.exports = sequelize.define("user", {
  user_id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  password: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  full_name: {
    type: Sequelize.STRING(80),
    allowNull: false
  }
});
