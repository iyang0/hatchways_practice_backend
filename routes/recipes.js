const express = require("express");
const fs = require('fs');
const recipesPath = "../data.json";
const recipes = require(recipesPath);
let router = new express.Router();


/* GET /recipes 
  
  output:
  {
    "recipeNames":
      [
        "scrambledEggs",
        "garlicPasta",
        "chai"
      ]
  }
*/
router.get("", function (req, res){  
  let recipeNames = recipes.recipes.map( e => e.name)

  return res.json({recipeNames});
});


/* POST /recipes 
input:{name, ingredients, instructions} 
output: status: 201
{
	"name": "butteredBagel", 
	"ingredients": [
			"1 bagel", 
			"butter"
		], 
	"instructions": [
		"cut the bagel", 
		"spread butter on bagel"
	] 
} 

if already exists => status:400
{ "error": "Recipe already exists."} 
*/

router.post("", function(req, res){
  
  if(recipes.recipes.find( e => e.name === req.body.name)){
    return res.status(400).json({error: "Recipe already exists."}) 
  }else{
    let recipe = { name: req.body.name, 
      ingredients: req.body.ingredients,
      instructions: req.body.instructions};

    recipes.recipes.push(recipe);
    
    fs.writeFile('./data.json', JSON.stringify(recipes, null, 2), function (err) {
      if(err) throw err;
      console.log('writing to data.json');
    });

    return res.json(recipe);
  }
});

/* GET /recipes/details/:recipeName
output:
{
	"details":
		{
			"ingredients": [
				"500mL water",
				"100g spaghetti",
				"25mL olive oil",
				"4 cloves garlic",
				"Salt"
			],
			"numSteps":5
		}
}

*/
router.get("/details/:recipe", function (req, res){  
  let recipe = recipes.recipes.find( e => e.name === req.params.recipe);
  let details = recipe
    ? { "ingredients": recipe.ingredients,
      "numSteps": recipe.instructions.length}
    : {};

  return res.json({details});
});

module.exports = router;