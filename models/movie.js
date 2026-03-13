const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    imdbId: { type: String, required: true, unique: true },
    title: String,
    genre: String,
    synopsis: String,
    rating: String,
    tomatoMeter: Number,
    imdbLink: String,
    posterUrl: String,
    releaseYear: Number,
});

module.exports = mongoose.model('Movie', movieSchema)