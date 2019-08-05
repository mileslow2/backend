const comparePasswords = require("../../helpers/comparePasswords");
const usedDefense = require("../../security");
const getUserData = require('./util/getUserData');
const jwt = require('jsonwebtoken');

module.exports = async app =>
{
    const keys = ["email", "password"];
    var userData,
        passwordAttempt,
        hashedPassword,
        verified,
        body;
    app.post("/login", async (req, res) =>
    {
        if (await usedDefense(req, res, keys)) return;
        userData = await getUserData(req.body.email);
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
            body = {
                user_id: userData.user_id
            };
            jwt.sign(
                {}, process.env.secret,
                {
                    expiresIn: "7d"
                },
                (err, token) =>
                {
                    body = {
                        token,
                        user_id: body.user_id
                    }
                    if (err) throw (err);
                    res.status(200).send(body);
                })

        }
    });
};