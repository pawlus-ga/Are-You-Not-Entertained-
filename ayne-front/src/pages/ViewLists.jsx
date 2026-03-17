import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLists } from '../services/lists';

export default function ViewLists() {
  const [lists, setLists] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const data = await getLists();
        setLists(data);
      } catch (err) {
        console.log(err);
        setError('Failed to load lists.');
      }
    };

    fetchLists();
  }, []);

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>My Lists</h1>

      {lists.length > 0 ? (
        <div>
          {lists.map((list) => (
            <div key={list._id}>
              <h2>
                <Link to={`/lists/${list._id}`}>{list.name}</Link>
              </h2>
              <p>{list.description}</p>
              <p>Movies in list: {list.movies.length}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>You have no lists yet.</p>
      )}
    </div>
  );
}