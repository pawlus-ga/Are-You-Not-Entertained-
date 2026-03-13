
const API_KEY = process.env.OMDB_API_KEY;
const BASE_URL = 'http://www.omdbapi.com/';

const searchMovies = async (query) => {
    const res = await fetch(`${BASE_URL}?s=${query}&apikey=${API_KEY}`)
    const data = await res.json();
    return data;
};

const getMovieById = async (imdbId) => {
    const res = await fetch(`${BASE_URL}?i=${imdbId}&apikey=${API_KEY}`);
    const data = await res.json();
    return data;
};

export { searchMovies, getMovieById };