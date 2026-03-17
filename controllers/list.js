const express = require('express');
const router = express.Router();
const List = require('../models/list');
const Movie = require('../models/movie');
const verifyToken = require('../middleware/verify-token');

// GET all lists for logged in user
router.get('/', verifyToken, async (req, res) => {
  try {
    const lists = await List.find({ user: req.user._id }).populate('movies');
    res.json(lists);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// GET one list
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const list = await List.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('movies');

    if (!list) {
      return res.status(404).json({ err: 'List not found' });
    }

    res.json(list);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// CREATE a list
router.post('/', verifyToken, async (req, res) => {
  try {
    const newList = await List.create({
      name: req.body.name,
      description: req.body.description,
      user: req.user._id,
      movies: []
    });

    res.status(201).json(newList);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// ADD a movie to a list
router.post('/:id/movies', verifyToken, async (req, res) => {
  try {
    const list = await List.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!list) {
      return res.status(404).json({ err: 'List not found' });
    }

    const {
      imdbId,
      title,
      genre,
      synopsis,
      rating,
      tomatoMeter,
      imdbLink,
      posterUrl,
      releaseYear
    } = req.body;

    let movie = await Movie.findOne({ imdbId });

    if (!movie) {
      movie = await Movie.create({
        imdbId,
        title,
        genre,
        synopsis,
        rating,
        tomatoMeter,
        imdbLink,
        posterUrl,
        releaseYear
      });
    }

    const alreadyInList = list.movies.some(
      (movieId) => movieId.toString() === movie._id.toString()
    );

    if (!alreadyInList) {
      list.movies.push(movie._id);
      await list.save();
    }

    const updatedList = await List.findById(list._id).populate('movies');
    res.status(200).json(updatedList);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// REMOVE a movie from a list
router.delete('/:listId/movies/:movieId', verifyToken, async (req, res) => {
  try {
    const list = await List.findOne({
      _id: req.params.listId,
      user: req.user._id
    });

    if (!list) {
      return res.status(404).json({ err: 'List not found' });
    }

    list.movies = list.movies.filter(
      (movieId) => movieId.toString() !== req.params.movieId
    );

    await list.save();

    const updatedList = await List.findById(list._id).populate('movies');
    res.json(updatedList);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// DELETE A LIST
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deletedList = await List.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!deletedList) {
      return res.status(404).json({ err: 'List not found' });
    }

    res.json({ message: 'List deleted successfully' });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updatedList = await List.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      {
        name: req.body.name,
        description: req.body.description
      },
      { new: true }
    ).populate('movies');

    if (!updatedList) {
      return res.status(404).json({ err: 'List not found' });
    }

    res.json(updatedList);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;