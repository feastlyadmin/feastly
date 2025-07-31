import { useRestaurantContext } from '../hooks/useRestaurantContext';

const RestaurantDetails = ({ restaurant }) => {
  const { dispatch } = useRestaurantContext();

  const handleClick = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/restaurants/${restaurant._id}`, {
      method: 'DELETE'
    });
    const json = await response.json(); // The backend sends back the deleted document

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
      <span className="delete-btn" onClick={handleClick}>delete</span>
    </div>
  );
};

export default RestaurantDetails;