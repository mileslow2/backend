const getPasswordFromID = require("../helpers/getPasswordFromID.js");
const comparePasswords = require("../helpers/comparePasswords.js");

function editUserQuery(userData) {
  return (
    { email: userData.email, full_name: userData.name },
    {
      where: {
        user_id: userData.id
      }
    }
  );
}

function editUserAction(con, query) {
  user.update(query).then(() => {
    console.log("Done");
  });
  con.query(query, function(err, res) {
    if (err) throw err;
    return true;
  });
}

module.exports = (app, con) => {
  var id, passwordAttempt, passwordsSame, editUserSuccesful, userData;
  app.post("/editUser", (req, res) => {
    id = req.body.id;
    hashedPassword = getPasswordFromID(con, id);
    passwordAttempt = req.body.password;
    passwordsSame = comparePasswords(passwordAttempt, hashedPassword);
    if (passwordsSame) {
      userData = req.body;
      query = editUserQuery(userData);
      editUserSuccesful = editUserAction(con, query);
    }
    if (passwordsSame && editUserSuccesful) res.status(200).send(true);
    else res.status(422).send(false);
  });
};
