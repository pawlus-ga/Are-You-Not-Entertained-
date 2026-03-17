import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getListById } from '../services/lists';

export default function ListDetails() {
  const { id } = useParams();
  const [list, setList] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchList = async () => {
      try {
        const data = await getListById(id);
        setList(data);
      } catch (err) {
        console.log(err);
        setError('Failed to load list details.');
      }
    };

    fetchList();
  }, [id]);

  if (error) return <h2>{error}</h2>;
  if (!list) return <h2>Loading list...</h2>;

  return (
    <div>
      <h1>{list.name}</h1>
      <p>{list.description}</p>

      <h2>Movies in this list</h2>

      {list.movies && list.movies.length > 0 ? (
        <div>
          {list.movies.map((movie) => (
            <div key={movie._id}>
              <h3>{movie.title}</h3>
              <p>{movie.releaseYear}</p>
              <p>{movie.genre}</p>

              {movie.posterUrl && movie.posterUrl !== 'N/A' && (
                <img src={movie.posterUrl} alt={movie.title} width="150" />
              )}

              {movie.imdbId && (
                <p>
                  <Link to={`/movies/omdb/${movie.imdbId}`}>View Movie Details</Link>
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No movies in this list yet.</p>
      )}
    </div>
  );
}