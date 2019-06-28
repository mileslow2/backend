const comparePasswords = require("../helpers/comparePasswords");
const user = require("../database/models/user");

function userDataFromEmail(email) {
  return {
    where: {
      email
    },
    attributes: ["password", "user_id"]
  };
}

async function getUserData(query) {
  var userData;
  await user
    .findOne(query)
    .catch(errorHandler)
    .then(data => {
      if (data !== null) userData = data.dataValues;
      else userData = null;
    });
  if (userData === null) userData = { emailExists: false };
  else userData.emailExists = true;
  return userData;
}

module.exports = async app => {
  var query,
    email,
    userData,
    passwordsSame,
    passwordAttempt,
    hashedPassword,
    body;
  app.post("/login", async (req, res) => {
    email = req.body.email;
    query = userDataFromEmail(email);
    userData = await getUserData(query);
    passwordAttempt = req.body.password;
    hashedPassword = userData.password;
    body = {};
    if (userData.emailExists)
      passwordsSame = await comparePasswords(passwordAttempt, hashedPassword);
    body.verified = userData.emailExists && passwordsSame;
    if (!body.verified) res.status(422).send(body);
    else {
      body.user_id = userData.user_id;
      res.status(200).send(body);
    }
  });
};
