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
    if (!tokenNecessary(req)) return true;
    let bearer = req.headers['authorization'];
    if (typeof bearer == 'undefined')
        return false;
    bearer = bearer.split(' ');
    const token = bearer[1];
    const valid = await verify(token);
    return valid;
}