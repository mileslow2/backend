const comparePasswords = require("../helpers/comparePasswords");

function userDataFromEmail(email) {
  return (
    'SELECT `password`, `user_id` from `user` WHERE (`email`) = ("' +
    email +
    '")'
  );
}

function getUserData(con, query) {
  var userData;
  userData.emailExists = false;
  con.query(query, function(err, res) {
    if (err) throw err;
    if (res[0] === undefined) userData.emailExists = false;
    else {
      userData = res[0];
      res.emailExists = true;
    }
    return userData;
  });
}

module.exports = (app, con) => {
  var query, email, userData, passwordsSame, passwordAttempt, hashedPassword;
  app.post("/login", (req, res) => {
    email = req.body.email;
    query = userDataFromEmail(email);
    userData = getUserData(con, query);
    passwordAttempt = req.body.password;
    hashedPassword = userData.password;
    passwordsSame = comparePasswords(passwordAttempt, hashedPassword);
    if (userData.emailExists || !passwordsSame) res.status(422).send(false);
    else res.status(200).send(true);
  });
};
