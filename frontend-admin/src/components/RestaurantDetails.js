import { useRestaurantContext } from '../hooks/useRestaurantContext';

const RestaurantDetails = ({ restaurant, onEditClick }) => {
  const { dispatch } = useRestaurantContext();

  const handleDeleteClick = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/restaurants/${restaurant._id}`, {
      method: 'DELETE'
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_RESTAURANT', payload: json });
    }
  };

  return (
    <div className="restaurant-details">
      <h4>{restaurant.name}</h4>
      <p><strong>Cuisine: </strong>{restaurant.cuisine}</p>
      <p><strong>Rating: </strong>{restaurant.rating}</p>
      <p>{new Date(restaurant.createdAt).toLocaleDateString()}</p>
      
      {/* --- Start of Corrected Button Structure --- */}
      <div className="card-actions">
        <span className="edit-btn" onClick={() => onEditClick(restaurant)}>edit</span>
        <span className="delete-btn" onClick={handleDeleteClick}>delete</span>
      </div>
      {/* --- End of Corrected Button Structure --- */}

    </div>
  );
};

export default RestaurantDetails;