const bcrypt = require("bcrypt");

module.exports = (passwordAttempt, hashedPassword) => {
  var same = false;
  bcrypt.compare(passwordAttempt, hashedPassword, function(err, res) {
    if (err) throw err;
    same = res;
  });
  return same;
};
