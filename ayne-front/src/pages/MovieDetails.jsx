import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../services/movieService';
import { getLists, addMovieToList } from '../services/lists'

export default function MovieDetails() {
  const { omdbId } = useParams();
  const [movie, setMovie] = useState(null);
  const [lists, setLists] = useState([]);
  const [selectedListId, setSelectedListId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetails(omdbId);
        setMovie(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMovie();
  }, [omdbId]);

    useEffect(() => {
    const fetchLists = async () => {
      try {
        const data = await getLists();
        console.log('lists from backend:', data);
        setLists(data);

        if (data.length > 0) {
          setSelectedListId(data[0]._id);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchLists();
  }, []);

  const handleSaveToList = async () => {
    try {
      if (!selectedListId || !movie) return;

      const movieData = {
        imdbId: movie.imdbID,
        title: movie.Title,
        genre: movie.Genre,
        synopsis: movie.Plot,
        rating: movie.imdbRating,
        tomatoMeter: null,
        imdbLink: `https://www.imdb.com/title/${movie.imdbID}/`,
        posterUrl: movie.Poster,
        releaseYear: parseInt(movie.Year)
      };

      await addMovieToList(selectedListId, movieData);
      setMessage('Movie saved to list!');
    } catch (err) {
      console.log(err);
      setMessage('Failed to save movie.');
    }
  };

  if (!movie) return <h2>Loading...</h2>;

  console.log('movie details:', movie);
console.log('poster url:', movie?.Poster);

  return (
    <div>
      <h1>{movie.Title}</h1>
      <p>{movie.Year}</p>
      <p>{movie.Genre}</p>
      <p>{movie.Plot}</p>
      {movie.Poster && movie.Poster !== 'N/A' && (
        <img src={movie.Poster} alt={movie.Title} width="200" />
      )}

      <div>
        <h3>Save to a List</h3>

        {lists.length > 0 ? (
          <>
            <select
              value={selectedListId}
              onChange={(e) => setSelectedListId(e.target.value)}
            >
              {lists.map((list) => (
                <option key={list._id} value={list._id}>
                  {list.name}
                </option>
              ))}
            </select>

            <button onClick={handleSaveToList}>Save to List</button>
          </>
        ) : (
          <p>No lists yet. Create one first.</p>
        )}

        {message && <p>{message}</p>}
      </div>
    </div>
  );
}