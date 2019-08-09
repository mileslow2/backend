const jwt = require('jsonwebtoken');
const user = require('../../database/models/user');
const secret = process.env.secret;

async function checkValidity(token)
{
    console.log('====================================');
    console.log(token);
    console.log('====================================');
    return await jwt.verify(
        token,
        secret,
        err =>
        {
            if (err) return false;
            else return true;
        });

}

async function validateUser(email)
{
    const valuesToSelect = {
        verified: 1
    }
    console.log('====================================');
    console.log(email);
    console.log('====================================');
    const selector = {
        where:
        {
            email
        }
    }
    await user
        .update(valuesToSelect, selector)
        .catch(errorHandler)
        .then(res =>
        {
            console.log('====================================');
            console.log(res);
            console.log('====================================');
        })
}

module.exports = async app =>
{
    app.get("/emailVerify", async (req, res) =>
    {
        const tokenValid = await checkValidity(req.query.token);
        if (tokenValid)
        {
            await validateUser(req.query.email);
            res.status(200).send("true");
        }
        else res.status(403).send("false");
    });
}