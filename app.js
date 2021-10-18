"use strict"

const express = require("express");
const app = express();
const recipes = require("data.json");

//error classes
const { NotFoundError, BadRequestError } = require("./expressError");

app.get("/recipes", function (req, res){
  return res.json(recipes);
});

module.exports = app;