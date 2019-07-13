const bcrypt = require("bcrypt");

module.exports = async (passwordAttempt, hashedPassword) =>
{
    const same = await new Promise((resolve, reject) =>
    {
        bcrypt.compare(passwordAttempt, hashedPassword, function(err, res)
        {
            if (err)
            {
                if (err.message.substr(0, 4) == "data")
                    reject(res);
                else throw (err);
            }
            resolve(res);
        });
    });
    return same;
};