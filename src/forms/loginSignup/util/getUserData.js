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
    var userData;
    await user
        .findOne(query)
        .catch(errorHandler)
        .then(data =>
        {
            if (data !== null) userData = data.dataValues;
            else userData = null;
        });
    if (userData === null) userData = {
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