const Sequelize = require("sequelize");
const sequelize = require("../connect");

module.exports = sequelize.define("restaurant_marker",
{
    restaurant_id:
    {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    lat:
    {
        type: Sequelize.INTEGER(8),
        allowNull: false,
        unique: true
    },
    lng:
    {
        type: Sequelize.INTEGER(8),
        allowNull: false,
        unique: true
    },

})