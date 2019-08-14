const
{
    sign
} = require('jsonwebtoken');

module.exports = (expiresIn, path, user_id) =>
{
    let secret = process.env.secret;
    if (path != "register")
        secret = process.env.passwordSecret;
    return (
        sign(
            {
                user_id
            },
            secret,
            {
                expiresIn
            })
    );
}