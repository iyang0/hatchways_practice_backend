const express = require("express");
let router = new express.Router();
const recipes = require("../data.json");

router.get("/", function (req, res){  
  let recipeNames = recipes.recipes.map( e => e.name)

  return res.json({recipeNames});
});

router.get("/details/:recipe", function (req, res){  
  let recipe = recipes.recipes.find( e => e.name === req.params.recipe);
  let details = recipe
    ? { "ingredients": recipe.ingredients,
      "numSteps": recipe.instructions.length}
    : {};

  return res.json({details});
});

module.exports = router;