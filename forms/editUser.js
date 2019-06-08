const getPasswordFromID = require("../helpers/getPasswordFromID.js");
const comparePasswords = require("../helpers/comparePasswords.js");

function editUserQuery(email, name, id) {
  return (
    'UPDATE `user` SET `email`= "' +
    email +
    '", `full_name`= "' +
    name +
    '" WHERE `user_id` = "' +
    id +
    '"'
  );
}

function editUserAction(con, query) {
  con.query(query, function(err, res) {
    if (err) throw err;
    else return true;
  });
}

module.exports = (app, con) => {
  var id, passwordAttempt, passwordsSame, query, editUserSuccesful;
  app.post("/editUser", (req, res) => {
    id = req.body.id;
    hashedPassword = getPasswordFromID(con, id);
    passwordAttempt = req.body.password;
    passwordsSame = comparePasswords(passwordAttempt, hashedPassword);
    if (passwordsSame) {
      query = editUserQuery(req.body.email, req.body.full_name, req.body.id);
      editUserSuccesful = editUserAction(con, query);
    }
    if (passwordsSame && editUserSuccesful) res.status(200).send(true);
    else res.status(422).send(false);
  });
};
