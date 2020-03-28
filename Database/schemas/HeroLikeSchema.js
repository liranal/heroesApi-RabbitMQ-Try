var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var HeroLikeSchema = new Schema({
  idHero: Number,
  NumOfLikes: Number
});

module.exports = mongoose.model("HeroLike", HeroLikeSchema);
