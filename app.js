require('dotenv').config();
const app = require("express")();
const bodyParser = require("body-parser");
const helmet = require("helmet");
const all = require("./src/forms/index");
const errorHandler = err =>
{
    if (err) throw err.message;
};

global.errorHandler = errorHandler;
app.use(helmet());
app.use(bodyParser.json());

require("./src/database/connect"); // adds the db to sequelize
all(app);


app.use(function(err, req, res, next)
{
    try
    {
        JSON.parse(req);
    }
    catch (err)
    {
        const errMessage = err.message.substr(0, 6);
        const reqIsAString = errMessage === "Unexpe";
        if (reqIsAString) res.status(400).end("false");
        else
        {

            if (res.headersSent)
            {
                return next(err);
            }
            console.log(err);
            res.status(500);
            res.render("error",
            {
                error: err
            });
        }
    }

}); //error handler

const port = 8081;
app.listen(port, () => console.info("Application running on port " + port));