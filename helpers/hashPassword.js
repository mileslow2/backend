const bcrypt = require("bcrypt");
var returnValue = "sfad";
module.exports = async password => {
  const saltRounds = 5;

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function(err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });
  return hashedPassword;
};
