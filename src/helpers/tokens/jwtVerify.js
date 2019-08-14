const
{
    verify
} = require('jsonwebtoken');

function tokenNecessary(req)
{
    if (req.path == "/login" ||
        req.path == "/register" ||
        req.path == "/forgotPassword"
    )
        return false;
    return true;
}

function verifyToken(token, path)
{
    let secret = process.env.secret;
    if (path == "forgotPassword")
        secret = process.env.passwordSecret;
    return verify(
        token,
        secret,
        (err, token) =>
        {

            if (err || await) return false;
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