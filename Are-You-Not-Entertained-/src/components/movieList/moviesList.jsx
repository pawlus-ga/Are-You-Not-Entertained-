const Movie = require('../models/movie.js')
const express = require('express')
const router = express.Router()

// create movie
router.post('/', async (req, res) => {
    try {
        const createdMovie = await Movie.create(req.body)
        res.status(201).json(createdMovie)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
})

// index movie
router.get('/', async (req, res) => {
    try {
        const foundMovies = await Movie.find();
        res.status(200).json(foundMovies)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
})

// show movies
router.get('/:movieId', async (req, res) => {
    try {
        const foundMovie = await Movie.findById(req.params.movieId)
        if(!foundMovie) {
            res.status(404)
            throw new Error('Movie not found.')
        }
        res.status(200).json(foundMovie)
    } catch (err) {
        if(res.statusCode === 404){
            res.json({ err: err.message })
        } else {
            res.status(500).json({ err: err.message })
        }
    }
})

// delete movie
router.delete('/:movieId', async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.movieId)
        if(!deletedMovie) {
            res.status(404)
            throw new Error('Movie not found.')
        }
        res.status(200).json(deletedMovie)
    } catch (err) {
        if(res.statusCode === 404) {
            res.json({ err: err.message })
        } else {
            res.status(500).json({ err: err.message })
        }
    }
})

// update movie
router.put('/:movieId', async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.movieId, req.body, { new: true })
        if(!updatedMovie) {
            res.status(404)
            throw new Error('Movie not found.')
        }
        res.status(200).json(updatedMovie)
    } catch (err) {
        if(res.statusCode === 404) {
            res.json({ err: err.message })
        } else {
            res.status(500).json({ err: err.message })
        }
    }
})

module.exports = router