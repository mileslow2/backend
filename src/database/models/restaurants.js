const Sequelize = require("sequelize");
const sequelize = require("../connect");

module.exports = sequelize.define("restaurants",
{
    restaurant_id:
    {
        type: Sequelize.INTEGER(11),
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
    name:
    {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: false
    }
})