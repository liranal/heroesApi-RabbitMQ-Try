var axios = require("axios");
var Hero = require("../Database/schemas/HeroSchema");

function validateHero(obj) {
  for (const property in obj) {
    if (typeof obj[property] === "object" && obj[property] != "null") {
      validateHero(obj[property]);
    } else if (obj[property] == "null") {
      obj[property] = defaultVal(typeof obj[property]);
    }
  }
}

function defaultVal(type) {
  if (typeof type !== "string") throw new TypeError("Type must be a string.");
  switch (type) {
    case "boolean":
      return false;
    case "number":
      return 0;
    case "object":
      return {};
    case "string":
      return "";
  }
}

module.exports.LoadHeroes = async () => {
  try {
    for (let heroId = 1; heroId <= 731; heroId++) {
      console.log("HeroId: " + heroId);
      data = await axios.get(
        "https://superheroapi.com/api/3463956196951384/" + heroId
      );
      let hero = data.data;
      validateHero(hero);
      new Hero({
        id: hero.id,
        name: hero.name,
        slug: hero.slug,
        powerstats: hero.powerstats,
        appearance: hero.appearance,
        biography: hero.biography,
        work: hero.work,
        connections: hero.connections,
        images: hero.images
      }).save();
      console.log(hero);
    }
  } catch (error) {
    console.log(error);
  }
};
