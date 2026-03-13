const express = require('express')
const router = express.Router()
const movieApi = require('../Are-You-Not-Entertained-/services/movie-api');

router.get('/new', (req, res) => {
    res.render('movies/new', { movies: null, query: '' });
});

router.get('/search', async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.render('movies/new', { movies: null, query: '' });
    }

    const data = await movieApi.searchMovies(query);

    res.render('movies/new', {
      movies: data.Search || [],
      query,
    });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
})

router.get('/:imdbId', async (req, res) => {
  try {
    const movie = await movieApi.getMovieById(req.params.imdbId);
    res.render('movies/show', { movie });
  } catch (err) {
    console.log(err);
    res.redirect('/movies/new');
  }
})

module.exports = router 