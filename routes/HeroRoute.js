const express = require("express");
const HeroesModel = require("../Models/HeroModel");
const router = express.Router();

router.route("/").get(function(req, res) {
  HeroesModel.getAllHeroes().then(allHeros => {
    res.json(allHeros);
  });
});

router.route("/:id").get(function(req, res) {
  HeroesModel.getHeroByID(req.params.id)
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
    images: req.body.images
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
    images: req.body.images
  })
    .then(data => {
      console.log("ADDED Person" + data);
      res.json(data);
    })
    .catch(err => res.send(err));
});

router.route("/:id").delete(function(req, res) {
  console.log(req.params.id);
  if (!(req.params.id >= 1 && req.params.id <= 731)) {
    response = HeroesModel.deleteHero(req.params.id);
    res.send(response);
  } else {
    res.send("Cant Delete basic heroes");
  }
});

module.exports = router;
