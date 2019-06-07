import bcrypt from "bcrypt";

async function comparePasswords(passwordAttempt, hashedPassword) {
  var same = false;
  bcrypt.compare(passwordAttempt, hashedPassword, function(err, res) {
    if (err) throw err;
    same = res;
  });
  return same;
}

export default comparePasswords;
