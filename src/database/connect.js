const Sequelize = require("sequelize");

var sequelize = new Sequelize("glutenMaps", "root", "123", {
	host: "localhost",
	dialect: "mysql",
	logging: false,
	define: {
		timestamps: false
	}
});

module.exports = sequelize;