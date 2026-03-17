import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getListById, updateList } from '../services/lists';

export default function EditList() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
    const fetchList = async () => {
      try {
        const data = await getListById(id);
        setFormData({
          name: data.name || '',
          description: data.description || ''
        });
      } catch (err) {
        console.log(err);
        setError('Failed to load list for editing.');
      }
    };

    fetchList();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateList(id, formData);
      navigate(`/lists/${id}`);
    } catch (err) {
      console.log(err);
      setError('Failed to update list.');
    }
  };

  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <h1>Edit List</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>List Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>


        <button type="submit">Update List</button>
      </form>
    </div>
  );
}