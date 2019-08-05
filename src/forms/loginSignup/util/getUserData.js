const user = require('../../../database/models/user')

function userDataFrom(email)
{
    return {
        where:
        {
            email
        },
        attributes: ["password", "user_id"]
    };
}

async function getUserData(query)
{
    let userData = null;
    console.log('====================================');
    console.log(query);
    console.log('====================================');
    await user
        .findOne(query)
        .catch(errorHandler)
        .then(data =>
        {
            if (data !== null) userData = data.dataValues;
        });
    if (userData == null)
        userData = {
            emailExists: false
        };
    else userData.emailExists = true;

    return userData;
}

module.exports = async email =>
{
    const userData = userDataFrom(email);
    return await getUserData(userData);
}