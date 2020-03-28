const Hero = require("../Database/schemas/HeroSchema");

module.exports.getAllHeroes = async () => {
  allHeroesData = await Hero.find({}, function(err, Heroes) {
    if (err) {
      return err;
    } else {
      console.log(Heroes);
      return Heroes;
    }
  });

  return allHeroesData;
};

module.exports.getHeroByID = async function(id) {
  HeroData = await Hero.find({ id: id }, function(err, Hero) {
    if (err) {
      return err;
    } else {
      console.log(Hero);
      return Hero;
    }
  });

  return HeroData;
};

module.exports.setHeroByID = async function(id, obj) {
  console.log(obj);
  update = await Hero.findOneAndUpdate(
    { id: id },
    obj,
    { upsert: true },
    function(err) {
      if (err) return "error";
      return { message: "Hero updated successfuly" };
    }
  );
  return update;
};

module.exports.addHero = async function(obj) {
  newHero = new Hero(obj);
  console.log("NEW Hero: " + newHero);
  let add = await newHero.save();
  return add;
};

module.exports.deleteHero = async function(id) {
  console.log(id);
  return Hero.findOneAndDelete({ id: id });
};
