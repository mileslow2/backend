const fetch = require("node-fetch");

module.exports = async (url, body) => {
	var res;
	body = JSON.stringify(body);
	await fetch(url, {
		method: "POST",
		body,
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(response => response.json())
		.then(response => (res = response));
	return res;
};
