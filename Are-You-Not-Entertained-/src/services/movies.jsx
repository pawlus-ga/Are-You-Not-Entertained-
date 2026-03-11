// src/services/movies.js  
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/movies`;

const getAllMovies = async () => {
  try {
    const response = await fetch(BASE_URL);  
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }   
    const movies = await response.json();
    return movies;
  }
    catch (error) { 
    console.error('Error fetching movies:', error);
    throw error;
  } 
};  

const getMovieById = async (id) => {
    try {   
    const response = await fetch(`${BASE_URL}/${id}`);  
    if (!response.ok) {
        throw new Error(`Failed to fetch movie with id ${id}`);
    }       
    const movie = await response.json();
    return movie;
  } 
    catch (error) { 
    console.error(`Error fetching movie with id ${id}:`, error);
    throw error;
  }
};

export { getAllMovies, getMovieById };      