const
{
    sign
} = require('jsonwebtoken');

module.exports = (expiresIn, path) =>
{
    let secret = process.env.secret;
    if (path != "register")
        secret = process.env.passwordSecret;
    return (
        sign(
        {}, secret,
        {
            expiresIn
        })
    );
}