import { useEffect, useState } from 'react';
import { useRestaurantContext } from './hooks/useRestaurantContext';
import './App.css';

// Components
import RestaurantDetails from './components/RestaurantDetails';
import RestaurantForm from './components/RestaurantForm';

function App() {
  const { restaurants, dispatch } = useRestaurantContext();
  const [restaurantToEdit, setRestaurantToEdit] = useState(null); // New state

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
    <div className="App">
      <header>
        <h1>Feastly Admin Dashboard</h1>
      </header>
      <main className="home">
        <div className="restaurants">
          {restaurants && restaurants.map((restaurant) => (
            // Pass the setRestaurantToEdit function as a prop
            <RestaurantDetails
              key={restaurant._id}
              restaurant={restaurant}
              onEditClick={setRestaurantToEdit}
            />
          ))}
        </div>
        {/* Pass the restaurant to edit and a reset function to the form */}
        <RestaurantForm
          restaurantToEdit={restaurantToEdit}
          onFormSubmit={() => setRestaurantToEdit(null)}
        />
      </main>
    </div>
  );
}

export default App;