import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getListById, removeMovieFromList, deleteList } from '../services/lists';

export default function ListDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const handleRemoveMovie = async (movieId) => {
    try {
      const updatedList = await removeMovieFromList(id, movieId);
      setList(updatedList);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteList = async () => { // 👈 ADD HERE
  try {
    await deleteList(id);
    navigate('/lists');
  } catch (err) {
    console.log(err);
  }
};

  if (error) return <h2>{error}</h2>;
  if (!list) return <h2>Loading list...</h2>;

  return (
    <div className='listdetails'>
      <div>
        <h1>{list.name}</h1>
        
        <Link to={`/lists/${id}/edit`}>
          <button>Edit List</button>
        </Link>

        <button onClick={handleDeleteList}>Delete List</button>


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
                    <Link to={`/movies/omdb/${movie.imdbId}`}>
                      View Movie Details
                    </Link>
                  </p>
                )}

                <button onClick={() => handleRemoveMovie(movie._id)}>
                  Remove from List
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No movies in this list yet.</p>
        )}
      </div>
    </div>
  );
}