const Sequelize = require("sequelize");

module.exports = sequelize.define("review", {
  restaurant_id: {
    type: Sequelize.STRING(45),
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  description: {
    type: Sequelize.STRING(130),
    allowNull: false
  },
  average: {
    type: Sequelize.TINYINT(4),
    defaultValue: NULL, // not sure if this is right
    allowNull: true
  }
});
