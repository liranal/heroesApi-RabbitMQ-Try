const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/HeroesDB");
mongoose.set("debug", true);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection Error"));
db.once("open", () => console.log("Connected to Heroes database"));
