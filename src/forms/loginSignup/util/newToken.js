const jwt = require('jsonwebtoken');

module.exports = expiresIn =>
{
    return (
        jwt.sign(
        {}, process.env.secret,
        {
            expiresIn
        })
    );
}