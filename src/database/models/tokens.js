const
    {
        INTEGER,
        STRING
    } = require("sequelize");
const sequelize = require("../connect");

module.exports = sequelize.define("token",
    {
        user_id:
            {
                type: INTEGER(11),
                unique: true,
                primaryKey: true,
                allowNull: false
            },
        iat:
            {
                type: STRING(10),
                allowNull: false
            }
    })