const user = require("../../database/models/user");
const usedDefense = require("../../security");

function userInfoQuery(user_id)
{
    return {
        where:
        {
            user_id
        },
        attributes: ["first_name", "email", "last_name"]
    };
}

async function userInfoAction(query)
{
    var returnValue;
    await user
        .findOne(query)
        .catch({
            throw err;
        })
        .then(data =>
        {
            if (data == null) returnValue = false;
            else returnValue = data.dataValues;
        });
    return returnValue;
}
module.exports = app =>
{
    const keys = ["id"];
    var query, userInfo;
    app.post("/getUserInfo", async (req, res) =>
    {
        if (await usedDefense(req, res, keys)) return;
        query = userInfoQuery(req.body.id);
        userInfo = await userInfoAction(query);
        userInfo = JSON.stringify(userInfo);
        res.status(200).end(userInfo);
    });
};