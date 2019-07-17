const getPasswordFrom = require("../helpers/getPasswordFrom.js");
const comparePasswords = require("../helpers/comparePasswords.js");
const user = require("../database/models/user");
const usedDefense = require("../security/basicDefense");
const checkIfNotObj = require("../security/checkIfNotObj");

async function editUserAction(body)
{
    const selector = {
        where:
        {
            user_id: body.id
        }
    }
    const valuesToSelect = {
        email: body.email,
        first_name: body.first_name,
        last_name: body.last_name
    }
    var returnVal = false;
    await user
        .update(valuesToSelect, selector)
        .catch(errorHandler)
        .then(res =>
        {
            returnVal = true;
        });
    return returnVal;
}

module.exports = app =>
{
    const editUserKeys = ["id", "email", "first_name", "last_name", "password"]
    var passwordAttempt, passwordsSame, editUserSuccesful, badReq, bodyHasWrongKeys;
    app.post("/editUser", async (req, res) =>
    {
        badReq = usedDefense(req, res);
        if (!badReq) bodyHasWrongKeys = checkIfNotObj(editUserKeys, req, res);
        if (badReq || bodyHasWrongKeys) return;
        hashedPassword = await getPasswordFrom(req.body.id);
        if (hashedPassword == undefined)
        {
            res.status(422).send("false");
            return;
        }
        passwordAttempt = req.body.password;
        passwordsSame = await comparePasswords(passwordAttempt, hashedPassword);
        if (passwordsSame) editUserSuccesful = await editUserAction(req.body);
        if (passwordsSame && editUserSuccesful) res.status(200).send("true");
        else res.status(422).send("false");
    });
};