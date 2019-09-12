const usedDefense = require("../../security");
const sendEmail = require('./util/email');
const changePassword = require('./util/changePassword');
const checkIfAccountExists = require('./util/checkIfAccountExists');
const getUserIDFromEmail = require('./util/forgotPasswordUtil');
const keys = ["email"];
const newToken = require("./util/newToken");

module.exports = async app => {
    let passwordChanged, statusCode, accountExists, user_id, body, token;
    app.post('/forgotPassword', async (req, res) => {
        if (await usedDefense(req, res, keys)) return;
        accountExists = await checkIfAccountExists(req.body.email);
        if (accountExists) {
            sendEmail(req.body.email, "passwordReset");
            res.status(200).send("email will be sent shortly");
        }
        else
            res.status(404).send("that email does not exist");
    });
    app.get('/passwordReset', async (req, res) => {
        passwordChanged = await changePassword(req.query);
        statusCode = passwordChanged ? 200 : 500;
        user_id = await getUserIDFromEmail(req.query.email);
        token = await newToken("7d", "password", user_id);
        body = {
            passwordChanged,
            token
        };
        res.status(statusCode).send(body)
    });
}