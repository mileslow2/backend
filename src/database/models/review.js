const sequelize = require("../connect");
const Sequelize = require("sequelize");

module.exports = sequelize.define("review",
{
    stars:
    {
        type: Sequelize.DECIMAL(2, 1),
        allowNull: false,
        primaryKey: true,
        defaultValue: true,
        defaultValue: "0"
    },
    body:
    {
        type: Sequelize.STRING(300),
        allowNull: false
    },
    user_id:
    {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    restaurant_id:
    {
        type: Sequelize.STRING(45),
        allowNull: false,
        unique: true
    },
    first_name:
    {
        type: Sequelize.STRING(30),
        allowNull: false
    }
});