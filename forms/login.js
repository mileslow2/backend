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
      userData = data[0];
    });
  if (userData === undefined) userData.emailExists = false;
  else userData.emailExists = true;
  return userData;
}

module.exports = app => {
  var query,
    email,
    userData,
    passwordsDifferent,
    passwordAttempt,
    hashedPassword;
  app.post("/login", async (req, res) => {
    email = req.body.email;
    query = userDataFromEmail(email);
    userData = await getUserData(query);
    passwordAttempt = req.body.password;
    hashedPassword = userData.password;
    passwordsDifferent = await comparePasswords(
      passwordAttempt,
      hashedPassword
    );
    if (userData.emailExists || passwordsDifferent) res.status(422).send(false);
    else res.status(200).send(true);
  });
};
