const Sequelize = require("sequelize");
const sequelize = require("../connect");

module.exports = sequelize.define("restaurant_info",
    {
        restaurant_id:
            {
                type: Sequelize.INTEGER(11),
                unique: true,
                primarykey: false,
                // references:
                // {
                //     model: 'restaurants',
                //     key: 'restaurant_id'
                // },
            },
        description:
            {
                type: Sequelize.STRING(200),
                allowNull: true
            },
        address:
            {
                type: Sequelize.STRING(200),
                allowNull: false
            },
        phone_number:
            {
                type: Sequelize.STRING(10),
                allowNull: false
            },
        hours:
            {
                type: Sequelize.STRING(56),
                allowNull: false

            },
        google_maps_id:
            {
                type: Sequelize.STRING(200),
                allowNull: false
            }
    });