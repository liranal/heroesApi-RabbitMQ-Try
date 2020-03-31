const express = require("express");
const HeroesModel = require("../Models/HeroModel");
const HeroLikesModel = require("../Models/HeroLikesModel");
const router = express.Router();

router.route("/").get(function(req, res) {
  HeroesModel.getAllHeroes().then(allHeros => {
    res.json(allHeros);
  });
});

router.route("/like").get(function(req, res) {
  HeroLikesModel.getAllLikes()
    .then(allLikes => {
      res.json(allLikes);
    })
    .catch(err => res.send(err));
});

router.route("/:id").get(function(req, res) {
  HeroesModel.getHeroByID(req.params.id)
    .then(Hero => {
      res.json(Hero);
    })
    .catch(err => res.send(err));
});

router.route("/name/:name").get(function(req, res) {
  HeroesModel.getHeroByName(req.params.name)
    .then(Hero => {
      res.json(Hero);
    })
    .catch(err => res.send(err));
});

router.route("/:id").put(function(req, res) {
  console.log(req.body);
  HeroesModel.setHeroByID(req.params.id, {
    id: req.body.id,
    name: req.body.name,
    slug: req.body.slug,
    powerstats: req.body.powerstats,
    appearance: req.body.appearance,
    biography: req.body.biography,
    work: req.body.work,
    connections: req.body.connections,
    image: req.body.image
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => res.send(err));
});

router.route("/").post(function(req, res) {
  console.log(req.body);
  response = HeroesModel.addHero({
    id: req.body.id,
    name: req.body.name,
    slug: req.body.slug,
    powerstats: req.body.powerstats,
    appearance: req.body.appearance,
    biography: req.body.biography,
    work: req.body.work,
    connections: req.body.connections,
    image: req.body.image
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => res.send(err));
});

router.route("/:id").delete(function(req, res) {
  if (!(req.params.id >= 1 && req.params.id <= 731)) {
    response = HeroesModel.deleteHero(req.params.id);
    res.send(response);
  } else {
    res.send("Cant Delete basic heroes");
  }
});

/* Like Hero */

router.route("/:id/like").get(function(req, res) {
  HeroLikesModel.getHeroLikes(req.params.id)
    .then(HeroLikes => {
      res.json(HeroLikes);
    })
    .catch(err => res.send(err));
});

/*router.route("/:id/like").put(function(req, res) {
  console.log("ID IN LIKE PUT: " + req.params.id);
  HeroLikesModel.getHeroLikes(req.params.id)
    .then(HeroLikes => {
      console.log("HEROES LIKESSSS: " + HeroLikes);
      if (HeroLikes.NumOfLikes == undefined) {
        HeroLikesModel.addHeroLike({
          idHero: req.params.id,
          NumOfLikes: 0
        });
      } else {
        HeroLikesModel.setHeroLike(req.params.id, {
          idHero: req.params.id,
          NumOfLikes: HeroLikes.NumOfLikes + 1
        })
          .then(data => {
            return data;
          })
          .catch(err => {
            return err;
          });
      }
    })
    .then(data => {
      res.json(data);
    })
    .catch(err => res.send(err));
});
*/

router.route("/:id/like").put(function(req, res) {
  HeroLikesModel.getHeroLikes(req.params.id).then(HeroLikes => {
    console.log(HeroLikes);
    HeroLikes = HeroLikes[0];
    HeroLikesModel.setHeroLike(req.params.id, {
      idHero: req.params.id,
      NumOfLikes: HeroLikes == undefined ? 1 : HeroLikes.NumOfLikes + 1
    })
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  });
});

module.exports = router;
