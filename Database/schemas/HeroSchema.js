var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PowerStatsSchema = new Schema(
  {
    intelligence: Number,
    strength: Number,
    speed: Number,
    durability: Number,
    power: Number,
    combat: Number
  },
  { _id: false }
);

var AppearanceSchema = new Schema(
  {
    gender: String,
    race: String,
    height: Array,
    weight: Array,
    eyeColor: String,
    hairColor: String
  },
  { _id: false }
);

var BiographySchema = new Schema(
  {
    fullName: String,
    alterEgos: String,
    aliases: Array,
    placeOfBirth: String,
    firstAppearance: String,
    publisher: String,
    alignment: String
  },
  { _id: false }
);

var WorkSchema = new Schema(
  {
    occupation: String,
    base: String
  },
  { _id: false }
);

var ConnectionsSchema = new Schema(
  {
    affiliation: String,
    relatives: String
  },
  { _id: false }
);

var ImagesSchema = new Schema(
  {
    url: String
  },
  { _id: false }
);

var HeroSchema = new Schema({
  id: Number,
  name: String,
  slug: String,
  powerstats: PowerStatsSchema,
  appearance: AppearanceSchema,
  biography: BiographySchema,
  work: WorkSchema,
  connections: ConnectionsSchema,
  image: ImagesSchema
});

module.exports = mongoose.model("Hero", HeroSchema);
