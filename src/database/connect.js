const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    process.env.DBName,
    process.env.DBUsername,
    process.env.DBPassword,
    {
        host: "localhost",
        dialect: "mysql",
        // logging: false,
        define:
        {
            timestamps: false
        }
    });

module.exports = sequelize;