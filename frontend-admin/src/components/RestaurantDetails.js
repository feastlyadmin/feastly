const RestaurantDetails = ({ restaurant }) => {
  return (
    <div className="restaurant-details">
      <h4>{restaurant.name}</h4>
      <p><strong>Cuisine: </strong>{restaurant.cuisine}</p>
      <p><strong>Rating: </strong>{restaurant.rating}</p>
      <p>{restaurant.createdAt}</p>
    </div>
  );
};

export default RestaurantDetails;