var PORT = process.env.PORT || 5000;
var express = require("express");
var app = express();
const StartModel = require("./Models/StartupModel");
const bodyParser = require("body-parser");

require("./Database/database");

//StartModel.LoadHeroes();
var cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());

app.use("/api/hero", require("./routes/HeroRoute"));

console.log(`Listening at Port ${PORT}`);
app.listen(PORT);
