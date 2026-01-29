const Movie = require("../models/Movie");

async function getMovies(req, res) {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({ message: "Error al traer películas" });
  }
}

async function createMovie(req, res) {
  try {
    const { title, year, director, duration, genre, rate, poster } = req.body;

    if (!title || !year || !director || !duration || !genre || rate === undefined || !poster) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const newMovie = await Movie.create({
      title,
      year,
      director,
      duration,
      genre: Array.isArray(genre) ? genre : [genre],
      rate,
      poster,
    });

    return res.status(201).json(newMovie);
  } catch (error) {
    return res.status(500).json({ message: "Error al crear película" });
  }
}

module.exports = { getMovies, createMovie };
