const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const helmet = require("helmet");
const bcrypt = require("bcrypt");
const app = express();

function existsQuery(email) {
  return 'SELECT `password` from `user` WHERE (`email`) = ("' + email + '")';
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
    var responseBody = "true";
    var statusCode = 200;
    con.query(query, function(error, result) {
      if (error) throw error;
      if (result[0] === undefined) {
        responseBody = false;
        statusCode = 422;
        res.status(statusCode).send(responseBody);
      } else {
        const hashedPassword = result[0].password;
        const password = req.body.password;
        bcrypt.compare(password, hashedPassword, function(err, result) {
          if (!result) {
            statusCode = 422;
            responseBody = false;
          }
          res.status(statusCode).send(responseBody);
        });
      }
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
