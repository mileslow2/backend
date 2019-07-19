function checkIfNotObj(correctObjKeys, req)
{
    for (var i = 0; i < correctObjKeys.length; i++)
        if (req.body[correctObjKeys[i]] == undefined)
            return true;
    return false;
}

function isBad(obj) // change the name
{
    for (var key in obj)
    {
        if (
            !obj.hasOwnProperty(key) ||
            obj[key] === undefined ||
            typeof obj[key] != "string"
        ) return true;

    }
    return false;
}

module.exports = (req, res, keys) =>
{
    if (isBad(req.body) || checkIfNotObj(keys, req))
    {
        res.status(400).end("false");
        return true;
    }
    return false;
}