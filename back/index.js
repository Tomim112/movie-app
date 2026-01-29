const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Mongo local
const MONGO_URI = "mongodb://127.0.0.1:27017/pm2_movies";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch((err) => console.error("❌ Error MongoDB:", err.message));

// Schema + Model
const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    year: Number,
    director: String,
    duration: String,
    genre: { type: [String], default: [] },
    rate: Number,
    poster: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

// GET
app.get("/peliculas", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (e) {
    res.status(500).json({ error: "Error listando películas" });
  }
});

// POST
app.post("/peliculas", async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 API en http://localhost:${PORT}`));

