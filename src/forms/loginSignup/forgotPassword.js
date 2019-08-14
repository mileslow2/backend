const usedDefense = require("../../security");
const sendEmail = require('./util/email');
const changePassword = require('./util/changePassword');
const checkIfAccountExists = require('./util/checkIfAccountExists');
const keys = ["email"];


module.exports = async app =>
{
    let passwordChanged, statusCode, accountExists;
    app.post('/forgotPassword', async (req, res) =>
    {
        if (await usedDefense(req, res, keys)) return;
        accountExists = await checkIfAccountExists(req.body.email);
        if (accountExists)
        {
            sendEmail(req.body.email, "passwordReset");
            res.status(200).send("email will be sent shortly");
        }
        else
            res.status(404).send("that email does not exist");
    });
    app.get('/passwordReset', async (req, res) =>
    {
        // passwordChanged = await changePassword(req.query);
        statusCode = passwordChanged ? 200 : 500;
        res.status(statusCode).send(passwordChanged)
    });
}