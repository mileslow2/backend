const app = require("express")();
const bodyParser = require("body-parser");
const helmet = require("helmet");
const all = require("./forms/index");
const mysql = require("mysql2");

app.use(helmet());
app.use(bodyParser.json());

require("./database/connect");

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
