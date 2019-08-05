const jwt = require('jsonwebtoken');
const existsInDB = require('./existsInDB');

function tokenNecessary(req)
{
    if (req.path == "/register" || req.path == "/login")
        return false;
    return true;
}

async function verify(token)
{
    await jwt.verify(
        token, process, err =>
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
    let valid = await verify(token);
    const tokenInDB = await existsInDB(token);
    valid = !tokenInDB;
    return valid;
}