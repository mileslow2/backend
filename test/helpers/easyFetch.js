const fetch = require("node-fetch");
const jwt = require('jsonwebtoken')
const seq = require('../../src/database/connect');

function format(res) {
    return {
        user_id: res[0][0].user_id,
        iat: parseInt(res[0][0].iat)
    }
}

async function perfectToken() {
    const query = "SELECT * FROM `tokens`";
    const decoded = await seq
        .query(query)
        .catch(err => {
            throw err;
        })
        .then(res => {
            return format(res);
        })
    return jwt.sign(decoded, process.env.secret);
}

module.exports = async (url, body) => {
    let init = {
        method: "POST",
        body: JSON.stringify(body),
        headers:
            {
                "Content-Type": "application/json"
            }
    };
    const path = url.substr(url.lastIndexOf("/") + 1);
    if (path != "register" || path != "login")
        init.headers.authorization = await perfectToken();

    return fetch(url, init)
        .catch(err => {
            throw (err);
        })
        .then(response => {
            return response.json();
        });
};