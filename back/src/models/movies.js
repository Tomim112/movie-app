const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    year: { type: Number, required: true },
    director: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    genre: { type: [String], required: true },
    rate: { type: Number, required: true, min: 0, max: 10 },
    poster: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
