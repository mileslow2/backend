function makeQuery(userID) {
  return 'SELECT `password` from `user` WHERE (`user_id`) = ("' + userID + '")';
}

module.exports = (con, userID) => {
  var password;
  const query = makeQuery(userID);
  con.query(query, function(err, res) {
    if (err) throw err;
    password = res[0].password;
  });
  return password;
};
