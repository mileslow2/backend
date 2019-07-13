module.exports = (correctObjKeys, req, res) =>
{
    for (var i = 0; i < correctObjKeys.length; i++)
        if (req.body[correctObjKeys[i]] == undefined)
        {
            res.status(400).send(false)
            return true;
        }
    return false;
}