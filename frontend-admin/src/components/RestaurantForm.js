import { useState } from 'react';
import { useRestaurantContext } from '../hooks/useRestaurantContext';

const RestaurantForm = () => {
  const { dispatch } = useRestaurantContext();
  const [name, setName] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [rating, setRating] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const restaurant = { name, cuisine, rating };

    const response = await fetch('http://localhost:4000/api/restaurants', {
      method: 'POST',
      body: JSON.stringify(restaurant),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setName('');
      setCuisine('');
      setRating('');
      setError(null);
      // Dispatch the action to update the global state
      dispatch({ type: 'CREATE_RESTAURANT', payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Restaurant</h3>

      <label>Restaurant Name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <label>Cuisine Type:</label>
      <input
        type="text"
        onChange={(e) => setCuisine(e.target.value)}
        value={cuisine}
      />

      <label>Rating:</label>
      <input
        type="number"
        onChange={(e) => setRating(e.target.value)}
        value={rating}
      />

      <button>Add Restaurant</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default RestaurantForm;