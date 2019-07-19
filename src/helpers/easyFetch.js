const fetch = require("node-fetch");

function checkIfDefined(response)
{
    if (response === undefined) return false;
    return true;
}

module.exports = async (url, body) =>
{
    var res;
    body = JSON.stringify(body);
    const headers = {
        "Content-Type": "application/json"
    }
    await fetch(url,
        {
            method: "POST",
            body,
            headers
        })
        .catch(err => console.log(err.message))
        .then(response => response.json())
        .then(response => (res = response));
    return res;
};