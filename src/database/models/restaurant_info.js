const Sequelize = require("sequelize");
const sequelize = require("../connect");

module.exports = sequelize.define("restaurant_info",
{
    restaurant_id:
    {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    description:
    {
        type: Sequelize.STRING(130),
        allowNull: false
    },
    average:
    {
        type: Sequelize.TINYINT(4),
        allowNull: true
    },
    address:
    {
        type: Sequelize.STRING(45),
        allowNull: false
    },
    phone_number:
    {
        type: Sequelize.INTEGER(8),
        allowNull: true
    },
    restaurant_hours:
    {
        type: Sequelize.INTEGER(12)
    }

});