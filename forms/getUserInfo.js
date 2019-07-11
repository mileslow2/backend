const user = require("../database/models/user");

function userInfoQuery(id) {
	return {
		where: {
			user_id: id
		},
		attributes: ["first_name", "email", "last_name"]
	};
}

async function userInfoAction(query) {
	var returnValue;
	await user
		.findOne(query)
		.catch(errorHandler)
		.then(data => {
			if (data !== null) returnValue = data.dataValues;
			else returnValue = null;
		});
	return returnValue;
}

module.exports = app => {
	var query, userInfo;
	app.post("/getUserInfo", async (req, res) => {
		query = userInfoQuery(req.body.id);
		userInfo = await userInfoAction(query);
		res.status(200).send(userInfo);
	});
};
