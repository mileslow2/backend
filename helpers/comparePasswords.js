const bcrypt = require("bcrypt");

module.exports = async (passwordAttempt, hashedPassword) => {
	const same = await new Promise((resolve, reject) => {
		bcrypt.compare(passwordAttempt, hashedPassword, function(err, res) {
			if (err) {
				console.log(err);
				reject(res);
			}
			resolve(res);
		});
	});
	return same;
};
