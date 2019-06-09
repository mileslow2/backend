const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const helmet = require("helmet");
const app = express();
const all = require("./forms/index");

const config = {
  host: "localhost",
  user: "root",
  password: "123",
  database: "glutenMaps"
};

const con = mysql.createConnection(config);
app.use(helmet());
app.use(bodyParser.json());

con.connect(function(err) {
  if (err) throw err;
  all(app, con);
});

app.use(function(err, req, res, next) {
  if (res.headersSent) {
    return next(htmlescape(err));
  }
  console.log(err);
  res.status(500);
  res.render("error", { error: err });
}); //error handler
const port = 8081;
app.listen(port, () => console.info("Application running on port " + port));
