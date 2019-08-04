const fetch = require("node-fetch");

function checkIfDefined(response)
{
    if (response === undefined) return false;
    return true;
}

module.exports = async (url, body) =>
{
    return (
        await fetch(url,
        {
            method: "POST",
            body: JSON.stringify(body),
            headers:
            {
                "Content-Type": "application/json"
            }
        })
        .catch(err => console.log(err.message))
        .then(response =>
        {
            return response.json();
        })
    );
};