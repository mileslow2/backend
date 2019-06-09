function userInfoQuery(id) {
  return (
    'SELECT `full_name`, `email` from `user` WHERE (`user_id`) = ("' + id + '")'
  );
}

function userInfoAction(con, query) {
  con.query(query, function(err, res) {
    if (err) throw err;
    return res[0];
  });
}

module.exports = (app, con) => {
  var query, userInfo;
  app.post("/getUserInfo", (req, res) => {
    query = userInfoQuery(req.body.id);
    userInfo = userInfoAction(con, query);
    res.status(200).send(userInfo);
  });
};
