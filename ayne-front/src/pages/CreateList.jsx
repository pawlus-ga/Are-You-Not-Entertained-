import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createList } from '../services/lists';

export default function CreateList() {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createList(formData);
      setMessage('List created successfully!');
      navigate('/movies/search');
    } catch (err) {
      console.log(err);
      setMessage('Failed to create list.');
    }
  };

  return (
    <div>
      <h1>Create a New List</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Create List</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}