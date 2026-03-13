const API_KEY = process.env.OMDB_API_KEY

const searchMovies = async (query) => {
    const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`)
    const data = await response.json()
    return data
}

const getMovieById = async (imdbId) => {
    const response = await fetch(`http://www.omdbapi.com/?s=${imdbId}&apikey=${API_KEY}`)
    const data = await response.json()
    return data 
}

module.exports = {
    searchMovies,
    getMovieById
}