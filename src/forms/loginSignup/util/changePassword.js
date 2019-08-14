const user = require("../../../database/models/user");
const hashPassword = require("../../../helpers/hashPassword");

module.exports = async body =>
{
    const password = await hashPassword(body.password, );
    const selector = {
        where:
        {
            email: body.email
        }
    };
    const valuesToChange = {
        password
    }
    let changed = "true";
    await user
        .update(valuesToChange, selector)
        .catch(() =>
        {
            changed = "false";
        });
    return changed;
}