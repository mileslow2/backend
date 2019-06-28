const user = require("../database/models/user");

function makeQuery(userID) {
  return {
    where: {
      user_id: userID
    }
  };
}

module.exports = userID => {
  var password;
  const query = makeQuery(userID);
  await user
    .findAll(query)
    .catch(errorHandler)
    .then(res => {
      password = res[0].password;
    });
  return password;
};
