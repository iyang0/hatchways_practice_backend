const express = require("express");
let router = new express.Router();
const recipes = require("../data.json");

router.get("/", function (req, res){  
  let recipeNames = recipes.recipes.map( e => e.name)

  return res.json({recipeNames});
});

router.get("/details/:name", function (req, res){  
  let recipeNames = recipes.recipes.map( e => e.name)

  return res.json({recipeNames});
});

module.exports = router;