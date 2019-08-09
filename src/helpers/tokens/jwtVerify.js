const jwt = require('jsonwebtoken');

function tokenNecessary(req)
{
    if (req.path == "/register" || req.path == "/login")
        return false;
    return true;
}

async function verify(token)
{
    return await jwt.verify(
        token,
        process.env.secret,
        err =>
        {
            if (err) return false;
            return true;
        });
}

module.exports = async req =>
{
    if (tokenNecessary(req)) return true;
    const token = req.headers['authorization'];
    const valid = await verify(token);
    return valid;
}