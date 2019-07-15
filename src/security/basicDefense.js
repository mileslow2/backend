function isBad(obj) // change the name
{
    for (var key in obj)
    {
        if (
            obj.hasOwnProperty(key) ||
            obj[key] === undefined ||
            typeof obj[key] != "string"
        ) return false;

    }
    return true;
}

module.exports = (req, res) =>
{
    if (isBad(req.body))
    {
        res.status(400).end("false");
        return true;
    }
    return false;
}