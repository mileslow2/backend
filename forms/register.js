const hashPassword = require("../helpers/hashPassword");
const user = require("../database/models/user");

function registerQuery(userData) {
  return {
    password: userData.password,
    email: userData.email,
    full_name: userData.fullName
  };
}

async function registerUser(query) {
  var returnVal;
  await user
    .create(query)
    .catch(err => {
      if (err.message.substr(0, 6) === "Valida") returnVal = false;
      else errorHandler(err);
    })
    .then(() => {
      returnVal = true;
    });
  return returnVal;
}

module.exports = async app => {
  var userData, query, registerSuccesful;
  app.post("/register", async (req, res) => {
    userData = req.body;
    userData.password = await hashPassword(userData.password);
    query = registerQuery(userData);
    registerSuccesful = await registerUser(query);
    if (registerSuccesful) res.status(201).send("true");
    else res.status(422).send("false");
  });
};
