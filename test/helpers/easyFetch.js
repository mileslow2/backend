const fetch = require("node-fetch");

module.exports = async (url, body) =>
{
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
        init.headers.authorization = process.env.godToken;
    return (
        await fetch(url, init)
        .catch(err => console.log(err.message))
        .then(response =>
        {
            return response.json();
        })
    );
};