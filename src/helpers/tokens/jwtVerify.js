const
{
    verify
} = require('jsonwebtoken');
const checkIfTokenRenewed = require('./checkIfTokenRenewed');

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
    if (path == "/forgotPassword")
        secret = process.env.passwordSecret;
    return verify(
        token,
        secret,
        async (err, token) =>
        {
            const renewed = await checkIfTokenRenewed(token);
            if (err || renewed)
                return false;
            else return true;
        });
}

module.exports = async req =>
{
    if (!tokenNecessary(req)) return true;
    const token = req.headers['authorization'];
    const valid = await verifyToken(token, req.path);
    console.log('====================================');
    console.log(valid);
    console.log('====================================');
    return valid;
}