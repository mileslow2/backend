const JWTVerify = require('./helpers/tokens/jwtVerify');


function checkIfNotObj(correctObjKeys, req)
{
    for (let i = 0; i < correctObjKeys.length; i++)
        if (req.body[correctObjKeys[i]] == undefined)
            return true;
    return false;
}

function isBad(obj) // change the name
{
    for (let key in obj)
    {
        if (
            !obj.hasOwnProperty(key) ||
            obj[key] === undefined ||
            typeof obj[key] != "string"
        ) return true;

    }
    return false;
}



module.exports = async (req, res, keys) =>
{
    const tokenUnVerified = !(await JWTVerify(req));
    if (tokenUnVerified ||
        isBad(req.body) ||
        checkIfNotObj(keys, req))
    {
        res.status(403).end("false");
        return true;
    }
    return false;
}