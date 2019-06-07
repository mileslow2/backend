const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const helmet = require("helmet");
const bcrypt = require("bcrypt");
const app = express();

function passwordFromID(id) {
  return 'SELECT `password` from `user` WHERE (`user_id`) = ("' + id + '")';
}

function existsQuery(email) {
  return (
    'SELECT `password`, `user_id` from `user` WHERE (`email`) = ("' +
    email +
    '")'
  );
}
function userQuery(id) {
  return (
    'SELECT `full_name`, `email` from `user` WHERE (`user_id`) = ("' + id + '")'
  );
}

function editQuery(email, name, id) {
  return (
    'UPDATE `user` SET `email`= "' +
    email +
    '", `full_name`= "' +
    name +
    '" WHERE `user_id` = "' +
    id +
    '"'
  );
}

function makeQuery(body) {
  const password = body.password;
  const email = body.email;
  const fullName = body.fullName;
  return (
    'INSERT INTO `user` (`password`, `email`, `full_name`) VALUES  ("' +
    password +
    '", "' +
    email +
    '", "' +
    fullName +
    '")'
  );
}

const config = {
  host: "localhost",
  user: "root",
  password: "123",
  database: "glutenMaps"
};
const saltRounds = 5;
const con = mysql.createConnection(config);
app.use(helmet());
var password;
var query;
var statusCode;
var response;
con.connect(function(error) {
  if (error) throw error;
  app.use(bodyParser.json());

  app.post("/register", (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      req.body.password = hash;
      query = makeQuery(req.body);
      con.query(query, function(error, result) {
        response = true;
        statusCode = 201;
        if (error) {
          if (error.message.substr(0, 6) === "ER_DUP") {
            response = false;
            statusCode = 422;
          } else throw error;
        }
        res.status(statusCode).send(response);
      });
    });
  });

  app.post("/login", (req, res) => {
    const query = existsQuery(req.body.email);
    var responseBody = { verified: true };
    var statusCode = 200;
    con.query(query, function(error, result) {
      if (error) throw error;
      if (result[0] === undefined) {
        responseBody.verified = false;
        statusCode = 422;
        res.status(statusCode).send(responseBody);
      } else {
        const hashedPassword = result[0].password;
        const password = req.body.password;
        const id = result[0].user_id;
        bcrypt.compare(password, hashedPassword, function(err, result) {
          if (!result) {
            statusCode = 422;
            responseBody.verified = false;
          }
          responseBody.id = id;
          res.status(statusCode).send(responseBody);
        });
      }
    });
  });
  app.post("/userData", (req, res) => {
    const query = userQuery(req.body.id);
    con.query(query, function(error, result) {
      if (error) throw error;
      res.status(200).send(result[0]);
    });
  });
  app.post("/editUser", (req, res) => {
    const query = passwordFromID(req.body.id);
    con.query(query, function(error, result) {
      if (error) throw error;
      const password = req.body.password;
      const hashedPassword = result[0].password;
      bcrypt.compare(password, hashedPassword, function(err, result) {
        if (err) throw err;
        if (result) {
          const query2 = editQuery(
            req.body.email,
            req.body.full_name,
            req.body.id
          );
          con.query(query2, function(error2, result2) {
            if (error2) throw error2;
            res.status(200).send(true);
          });
        } else {
          res.status(422).send(false);
        }
      });
    });
  });
});

app.use(function(err, req, res, next) {
  if (res.headersSent) {
    return next(htmlescape(err));
  }
  console.log(err);
  res.status(500);
  res.render("error", { error: err });
}); //error handler
app.listen(2999, () => console.info("Application running on port 2999"));
