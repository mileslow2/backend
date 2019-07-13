const comparePasswords = require("../helpers/comparePasswords");
const user = require("../database/models/user");
const usedDefense = require("../security/basicDefense");

function userDataFrom(email)
{
    return {
        where:
        {
            email
        },
        attributes: ["password", "user_id"]
    };
}

async function getUserData(query)
{
    var userData;
    await user
        .findOne(query)
        .catch(errorHandler)
        .then(data =>
        {
            if (data !== null) userData = data.dataValues;
            else userData = null;
        });
    if (userData === null) userData = {
        emailExists: false
    };
    else userData.emailExists = true;
    return userData;
}

module.exports = async app =>
{
    var query,
        email,
        userData,
        passwordsSame,
        passwordAttempt,
        hashedPassword,
        body;
    app.post("/login", async (req, res) =>
    {
        if (usedDefense(req, res)) return;
        body = {};
        email = req.body.email;
        query = userDataFrom(email);
        userData = await getUserData(query);
        passwordAttempt = req.body.password;
        hashedPassword = userData.password;
        if (userData.emailExists)
            passwordsSame = await comparePasswords(passwordAttempt, hashedPassword);
        body.verified = userData.emailExists && passwordsSame;
        if (!body.verified)
        {
            res.status(422).send(body);
        }
        else
        {
            body.user_id = userData.user_id;
            res.status(200).send(body);
        }
    });
};