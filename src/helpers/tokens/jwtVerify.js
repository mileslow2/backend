const
{
    verify
} = require('jsonwebtoken');

function tokenNecessary(req)
{
    if (req.path == "/login" ||
        req.path == "/register" ||
        req.path == "resetPassword")
        return false;
    return true;
}

async function verifyToken(token)
{
    let secret = process.env.secret;
    if (path = resetPassword)
        secret = process.env.passwordSecret;
    return await verify(
        token,
        secret,
        err =>
        {
            if (err) return false;
            return true;
        });
}

module.exports = async req =>
{
    if (!tokenNecessary(req)) return true;
    const token = req.headers['authorization'];
    const valid = await verifyToken(token, req.path);
    return valid;
}