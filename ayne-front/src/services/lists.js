const BASE_URL = 'http://localhost:4000/lists';

const getLists = async () => {
  const token = localStorage.getItem('token');

  const res = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.json();
};

const getListById = async (listId) => {
  const token = localStorage.getItem('token');

  const res = await fetch(`${BASE_URL}/${listId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.json();
};

const addMovieToList = async (listId, movieData) => {
  const token = localStorage.getItem('token');

  const res = await fetch(`${BASE_URL}/${listId}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(movieData)
  });

  return res.json();
};

const createList = async (listData) => {
  const token = localStorage.getItem('token');

  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(listData)
  });

  return res.json();
};

export { getLists, getListById, addMovieToList, createList };