const hashPassword = require("../helpers/hashPassword");

function registerQuery(userData) {
  return (
    'INSERT INTO `user` (`password`, `email`, `full_name`) VALUES  ("' +
    userData.password +
    '", "' +
    userData.email +
    '", "' +
    userData.fullName +
    '")'
  );
}

function registerUser(con, query) {
  con.query(query, function(err) {
    if (err)
      if (error.message.substr(0, 6) === "ER_DUP") return false;
      else throw err;
    return true;
  });
}

module.exports = (app, con) => {
  var userData, query, registerSuccesful;
  app.post("/register", (req, res) => {
    userData = req.body;
    userData.password = hashPassword(userData.password);
    query = registerQuery(userData);
    registerSuccesful = registerUser(con, query);
    if (registerSuccesful) res.status(201).send(true);
    else res.status(201).send(true);
  });
};
