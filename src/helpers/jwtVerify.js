const jwt = require('jsonwebtoken');


function verifyToken(req)
{

}

module.exports = async req =>
{
    let bearer = req.headers['authorization'];
    if (typeof bearer == 'undefined')
        return false;
    bearer = bearer.split(' ');
    const token = bearer[1];
    let valid = true;
    await jwt.verify(
        token, proces, err =>
        {
            if (err) valid = false;
        });
    return valid;
}