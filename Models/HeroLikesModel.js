const HeroLikes = require("../Database/schemas/HeroLikeSchema");

module.exports.getAllLikes = async function() {
  (allLikesData = await HeroLikes.find()),
    function(err, Likes) {
      if (err) {
        return err;
      } else {
        console.log(Likes);
        return Likes;
      }
    };

  return allLikesData;
};

module.exports.getHeroLikes = async function(id) {
  retHeroLikes = await HeroLikes.find({ idHero: id }, (err, resp) => {
    if (err) {
      return err;
    } else {
      console.log(resp);
      return resp;
    }
  });
  return retHeroLikes;
};

module.exports.setHeroLike = async function(id, obj) {
  update = await HeroLikes.findOneAndUpdate(
    { idHero: id },
    obj,
    { upsert: true },
    function(err) {
      if (err) return "error";
      return { message: "Hero Like updated successfuly" };
    }
  );
  return update;
};

module.exports.addHeroLike = async function(obj) {
  let newHeroLike = new HeroLikes(obj);
  console.log("NEW HeroLike: " + newHeroLike);
  let add = await newHeroLike.save();
  return add;
};
