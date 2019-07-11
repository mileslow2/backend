const hashPassword = require("../helpers/hashPassword");
const user = require("../database/models/user");

function registerQuery(userData)
{
    return {
        password: userData.password,
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name
    };
}

function findIfErrorCauseIsUnknown(errorMessage)
{
    const errorStart = errorMessage.substr(0, 6);
    if (errorStart !== "Valida" || errorStart !== "notNul") return false;
    return true;
}

async function registerUser(query)
{
    var returnVal, errorIsUknown;
    await user
        .create(query)
        .catch(err =>
        {
            errorIsUknown = findIfErrorCauseIsUnknown(err.message);
            if (errorIsUknown) errorHandler(err);
            returnVal = false;
        })
        .then(result =>
        {
            if (typeof result == "object") returnVal = true;
        });
    return returnVal;
}

module.exports = async app =>
{
    var userData, query, registerSuccesful;
    app.post("/register", async (req, res) =>
    {
        userData = req.body;
        userData.password = await hashPassword(userData.password);
        query = registerQuery(userData);
        registerSuccesful = await registerUser(query);
        if (registerSuccesful) res.status(201).end("true");
        else res.status(422).end("false");
    });
};