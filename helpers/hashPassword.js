const bcrypt = require("bcrypt");

module.exports = password => {
  const saltRounds = 5;
  bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) throw err;
    return hash;
  });
};
