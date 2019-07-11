const fetch = require("node-fetch");

function checkIfDefined(response)
{
    if (response === undefined) return false;
    return true;
}

module.exports = async (url, body) =>
{
    var res, responseDefined;
    body = JSON.stringify(body);
    await fetch(url,
        {
            method: "POST",
            body,
            headers:
            {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(response => (res = response));
    return res;
};