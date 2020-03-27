const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://liranal:liraneilary1@heroesapi-galah.mongodb.net/HeroesDB?retryWrites=true&w=majority"
);
mongoose.set("debug", true);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection Error"));
db.once("open", () => console.log("Connected to HeroesDB database"));
