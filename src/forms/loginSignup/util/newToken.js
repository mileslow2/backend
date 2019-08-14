const
{
    sign
} = require('jsonwebtoken');
const renewToken = require('../../../helpers/tokens/renewToken');

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
            },
            test =>
            {
                console.log('====================================');
                console.log(test);
                console.log('====================================');
            })
    );
}