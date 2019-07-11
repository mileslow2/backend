const getPasswordFrom = require("../helpers/getPasswordFrom.js");
const comparePasswords = require("../helpers/comparePasswords.js");
const user = require("../database/models/user");
const defense = require("../security/basicDefense");

function editUserQuery(userData)
{
    return (
    {
        email: userData.email,
        first_name: userData.name
    },
    {
        where:
        {
            user_id: userData.id
        }
    });
}

async function editUserAction(userData)
{
    const query = editUserQuery(userData);
    await user
        .update(query)
        .catch(errorHandler)
        .then(() =>
        {
            return true;
        });
}

module.exports = () =>
{
    var id, passwordAttempt, passwordsSame, editUserSuccesful, userData;
    app.post("/editUser", async (req, res) =>
    {
        defense(req, res);
        id = req.body.id;
        hashedPassword = await getPasswordFrom(id);
        passwordAttempt = req.body.password;
        passwordsSame = await comparePasswords(passwordAttempt, hashedPassword);
        if (passwordsSame)
        {
            userData = req.body;
            editUserSuccesful = await editUserAction(userData);
        }
        if (passwordsSame && editUserSuccesful) res.status(200).send(true);
        else res.status(422).send(false);
    });
};