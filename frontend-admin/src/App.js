import { useEffect } from 'react';
import { useRestaurantContext } from './hooks/useRestaurantContext';
import './App.css';

// Components
import RestaurantDetails from './components/RestaurantDetails';
import RestaurantForm from './components/RestaurantForm';

function App() {
  const { restaurants, dispatch } = useRestaurantContext();

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await fetch('http://localhost:4000/api/restaurants');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_RESTAURANTS', payload: json });
      }
    };

    fetchRestaurants();
  }, [dispatch]); // Dependency array to prevent re-running on every render

  return (
    <div className="App">
      <header>
        <h1>Feastly Admin Dashboard</h1>
      </header>
      <main className="home">
        <div className="restaurants">
          {restaurants && restaurants.map((restaurant) => (
            <RestaurantDetails key={restaurant._id} restaurant={restaurant} />
          ))}
        </div>
        <RestaurantForm />
      </main>
    </div>
  );
}

// This is the line that was missing
export default App;