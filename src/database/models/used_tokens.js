const Sequelize = require("sequelize");
const sequelize = require("../connect");

module.exports = sequelize.define("used_token",
{
    used_token:
    {
        type: Sequelize.STRING(200),
        primaryKey: true,
        allowNull: false
    }
});