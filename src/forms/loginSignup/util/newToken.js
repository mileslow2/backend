const
{
    sign,
    decode
} = require('jsonwebtoken');
const renewToken = require('../../../helpers/tokens/renewToken');

function makeSignedToken(user_id, secret, expiresIn)
{
    return (
        sign(
            {
                user_id
            },
            secret,
            {
                expiresIn
            }
        ));
}

module.exports = async (expiresIn, path, user_id) =>
{
    let secret = process.env.secret;
    if (path != "register")
        secret = process.env.passwordSecret;
    const token = await makeSignedToken(user_id, secret, expiresIn);
    const decoded = await decode(token);
    await renewToken(token);
    return token;
}