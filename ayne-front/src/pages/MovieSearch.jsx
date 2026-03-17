import { useState } from 'react';
import { searchMovies } from '../services/movieService';
import { Link } from 'react-router-dom';

export default function MovieSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const movies = await searchMovies(query);
      setResults(movies);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='search'>
      <div>
        <h1>Movie Search</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <div>
          {results.map((movie) => (
            <Link key={movie.imdbID} to={`/movies/${movie.imdbID}`}>
              <div>
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
                {movie.Poster !== 'N/A' && (
                  <img src={movie.Poster} alt={movie.Title} width="150" />
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}