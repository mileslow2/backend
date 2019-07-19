const hashPassword = require("../helpers/hashPassword");
const user = require("../database/models/user");
const usedDefense = require("../security");


function registerQuery(userData)
{
    return {
        password: userData.password,
        email: userData.email.toLowerCase(),
        first_name: userData.first_name.toLowerCase(),
        last_name: userData.last_name.toLowerCase()
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
    var userData, query, registerSuccesful, badReq, reqHasWrongKeys;
    const keys = ["password", "email", "first_name", "last_name"];
    app.post("/register", async (req, res) =>
    {
        if (usedDefense(req, res, keys)) return;
        if (badReq || reqHasWrongKeys) return;
        userData = req.body;
        userData.password = await hashPassword(userData.password);
        query = registerQuery(userData);
        registerSuccesful = await registerUser(query);
        if (registerSuccesful) res.status(201).end("true");
        else res.status(422).end("false");
    });
};