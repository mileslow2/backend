const user = require("../database/models/user");

function userInfoQuery(id) {
  return {
    where: {
      user_id: id
    },
    attributes: ['full_name', 'email']
  };
}

async function userInfoAction(query) {
  await user
    .findOne(query)
    .catch(errorHandler)
    .then(() => {
      return true;
    });
}

module.exports = (app) => {
  var query, userInfo;
  app.post("/getUserInfo", (req, res) => {
    query = userInfoQuery(req.body.id);
    userInfo = await userInfoAction(con, query);
    res.status(200).send(userInfo);
  });
};
