const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },]
});

module.exports = mongoose.model('List', listSchema); 

