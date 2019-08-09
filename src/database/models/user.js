const Sequelize = require("sequelize");
const sequelize = require("../connect");

module.exports = sequelize.define("user",
{
    user_id:
    {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    password:
    {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    email:
    {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    first_name:
    {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    last_name:
    {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    verified:
    {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: '0'
    }
});