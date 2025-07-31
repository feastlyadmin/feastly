import { useEffect } from 'react';
import { useRestaurantContext } from '../hooks/useRestaurantContext';

// components
import RestaurantDetails from '../components/RestaurantDetails';
import RestaurantForm from '../components/RestaurantForm';

const Home = () => {
  const { restaurants, dispatch } = useRestaurantContext();

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/restaurants`);
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_RESTAURANTS', payload: json });
      }
    };

    fetchRestaurants();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="restaurants">
        {restaurants && restaurants.map((restaurant) => (
          <RestaurantDetails key={restaurant._id} restaurant={restaurant} />
        ))}
      </div>
      <RestaurantForm />
    </div>
  );
};

export default Home;