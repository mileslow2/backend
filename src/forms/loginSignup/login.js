const comparePasswords = require("../../helpers/comparePasswords");
const usedDefense = require("../../security");
const getUserData = require('./util/getUserData');
const newToken = require('./util/newToken');

module.exports = async app =>
{
    const keys = ["email", "password"];
    var userData,
        passwordAttempt,
        hashedPassword,
        verified,
        body,
        user_id;
    app.post("/login", async (req, res) =>
    {
        if (await usedDefense(req, res, keys)) return;
        userData = await getUserData(req.body.email);
        if (!userData.verified)
        {
            res.status(422).send("please verify your account");
            return;
        }
        passwordAttempt = req.body.password;
        hashedPassword = userData.password;
        verified = userData.emailExists &&
            await comparePasswords(
                passwordAttempt,
                hashedPassword
            );
        if (!verified)
            res.status(422).send("false");
        else
        {
            user_id = userData.user_id;
            body = {
                user_id,
                token: await newToken("7d", "register", userData.user_id)
            };
            res.status(200).send(body);
        }
    });
};