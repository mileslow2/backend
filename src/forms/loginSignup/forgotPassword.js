const usedDefense = require("../../security");
const sendEmail = require('./util/email');
const changePassword = require('./util/changePassword');
const keys = ["email"];


module.exports = async app =>
{
    app.post('/forgotPassword', async (req, res) =>
    {
        if (await usedDefense(req, res, keys));
        sendEmail(req.body.email, "passwordReset");
        res.status(200).send("email will be sent shortly");
    });
    var passwordChanged, statusCode;
    app.post('/resetPassword', async (req, res) =>
    {
        if (await usedDefense(req, res, keys));
        passwordChanged = await changePassword(req.body);
        statusCode = passwordChanged ? 200 : 500;
        res.status(statusCode).send(passwordChanged)
    });
}