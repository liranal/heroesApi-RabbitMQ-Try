var express = require("express");
var app = express();
const StartModel = require("./models/StartupModel");
const bodyParser = require("body-parser");

require("./database/database");

//StartModel.LoadHeroes();
var cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());

app.use("/api/hero", require("./routes/HeroRoute"));

app.listen(8000);
