const user = require("../database/models/user");

function makeQuery(userID)
{
    return {
        where:
        {
            user_id: userID
        }
    };
}

module.exports = async userID =>
{
    var password;
    const query = makeQuery(userID);
    await user
        .findAll(query)
        .catch(err => (console.log(err.message)))
        .then(res =>
        {
            if (res[0] != undefined)
                password = res[0].password;
        });
    return password;
};