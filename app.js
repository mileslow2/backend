require('dotenv').config();
const app = require("express")();
const bodyParser = require("body-parser");
const helmet = require("helmet");
const all = require("./src/forms/index");

app.use(helmet());
app.use(bodyParser.json());

require("./src/database/connect"); // adds the db to sequelize
all(app);

const port = 8081;
app.listen(port, () => console.info("Application running on port " + port));