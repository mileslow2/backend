const user = require("../database/models/user");
const defense = require("../security/basicDefense");

function userInfoQuery(id)
{
    return {
        where:
        {
            user_id: id
        },
        attributes: ["first_name", "email", "last_name"]
    };
}

async function userInfoAction(query)
{
    var returnValue;
    await user
        .findOne(query)
        .catch(errorHandler)
        .then(data =>
        {
            if (data !== null) returnValue = data.dataValues;
            else returnValue = null;
        });
    return returnValue;
}
// @TODO make res.end stop a response;
module.exports = app =>
{
    var query, userInfo, id;
    app.post("/getUserInfo", async (req, res) =>
    {
        id = req.body.id;
        defense(req, res);
        if (id === undefined || typeof id !== "string") res.status(400).end("false")
        query = userInfoQuery(id);
        userInfo = await userInfoAction(query);
        userInfo = JSON.stringify(userInfo);
        res.status(200).end(userInfo);
    });
};