import { useState, useEffect } from 'react';
import { useRestaurantContext } from '../hooks/useRestaurantContext';

const RestaurantForm = ({ restaurantToEdit, onFormSubmit }) => {
  const { dispatch } = useRestaurantContext();
  const [name, setName] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [rating, setRating] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  // This effect runs when a restaurant is selected for editing
  useEffect(() => {
    if (restaurantToEdit) {
      setName(restaurantToEdit.name);
      setCuisine(restaurantToEdit.cuisine);
      setRating(restaurantToEdit.rating);
    } else {
      // Reset form if we are not editing
      setName('');
      setCuisine('');
      setRating('');
      setError(null);
      setEmptyFields([]);
    }
  }, [restaurantToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const restaurant = { name, cuisine, rating };

    let response;
    // If we are editing, send a PATCH request
    if (restaurantToEdit) {
      response = await fetch(`${process.env.REACT_APP_API_URL}/api/restaurants/${restaurantToEdit._id}`, {
        method: 'PATCH',
        body: JSON.stringify(restaurant),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } else {
      // Otherwise, send a POST request
      response = await fetch(`${process.env.REACT_APP_API_URL}/api/restaurants`, {
        method: 'POST',
        body: JSON.stringify(restaurant),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
    }
    if (response.ok) {
      setError(null);
      setEmptyFields([]);
      
      // Dispatch the correct action based on the mode
      if (restaurantToEdit) {
        dispatch({ type: 'UPDATE_RESTAURANT', payload: json });
      } else {
        dispatch({ type: 'CREATE_RESTAURANT', payload: json });
      }

      onFormSubmit(); // This will reset the restaurantToEdit state in App.js
    }
  };

  return (
    // Change form title and button text based on whether we are editing
    <form className="create" onSubmit={handleSubmit}>
      <h3>{restaurantToEdit ? 'Edit Restaurant' : 'Add a New Restaurant'}</h3>

      <label>Restaurant Name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes('name') ? 'error' : ''}
      />

      <label>Cuisine Type:</label>
      <input
        type="text"
        onChange={(e) => setCuisine(e.target.value)}
        value={cuisine}
        className={emptyFields.includes('cuisine') ? 'error' : ''}
      />

      <label>Rating:</label>
      <input
        type="number"
        onChange={(e) => setRating(e.target.value)}
        value={rating}
      />

      <button>{restaurantToEdit ? 'Update Restaurant' : 'Add Restaurant'}</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default RestaurantForm;