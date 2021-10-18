"use strict"

const express = require("express");
const app = express();

//common errors
const { NotFoundError, BadRequestError } = require("./expressError");

module.exports = app;