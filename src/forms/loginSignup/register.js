const hashPassword = require("../../helpers/hashPassword");
const user = require("../../database/models/user");
const usedDefense = require("../../security");
const sendVerificationEmail = require('./util/email');

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
    var returnVal, errorIsunknown;
    await user
        .create(query)
        .catch(err =>
        {
            errorIsunknown = findIfErrorCauseIsUnknown(err.message);
            if (errorIsunknown) throw err;
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
    const keys = ["password", "email", "first_name", "last_name"];
    app.post("/register", async (req, res) =>
    {
        if (await usedDefense(req, res, keys)) return;
        userData = req.body;
        userData.password = await hashPassword(userData.password);
        query = registerQuery(userData);
        registerSuccesful = await registerUser(query);
        if (registerSuccesful)
        {
            sendVerificationEmail(req.body.email, "register");
            res.status(201).end("true");
        }
        else res.status(422).end("false");
    });
};