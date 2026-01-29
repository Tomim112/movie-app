const { Router } = require("express");
const { getMovies, createMovie } = require("../controllers/moviesController");

const moviesRouter = Router();

moviesRouter.get("/", getMovies);
moviesRouter.post("/", createMovie);

module.exports = moviesRouter;
