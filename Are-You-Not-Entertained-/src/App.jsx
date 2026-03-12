import { useState, useEffect } from 'react'
import './App.css'
import { getAllMovies } from './services/movies.jsx';
import MoviesList from './components/moviesList.jsx';

function App() {
const App = () => {  
    const [movies, setMovies] = useState([]);
    // Example of fetching movies on component mount
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const moviesData = await getAllMovies();
                setMovies(moviesData);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []); // Empty dependency array means this runs once on mount  

  return (
    <>
      <h1>Welcome to Are You Not Entertained?</h1>
      <p>Discover and explore your favorite movies!</p>
      {/* You can add more components and routes here */} 
      <MoviesList movies={movies} />
    </>
  )
}
}
export default App
