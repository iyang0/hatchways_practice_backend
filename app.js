"use strict"
const express = require("express");
const app = express();

//error classes
const { NotFoundError } = require("./expressError");

const recipesRoutes = require("./routes/recipes");

app.use("/recipes", recipesRoutes);

/** Handle 404 errors -- this matches everything */
/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});

module.exports = app;