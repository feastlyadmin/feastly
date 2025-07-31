import { createContext, useReducer } from 'react';

export const RestaurantContext = createContext();

export const restaurantsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_RESTAURANTS':
      return {
        restaurants: action.payload
      };
    case 'CREATE_RESTAURANT':
      return {
        restaurants: [action.payload, ...state.restaurants]
      };
    // Add the new case for deleting a restaurant
    case 'DELETE_RESTAURANT':
      return {
        restaurants: state.restaurants.filter((r) => r._id !== action.payload._id)
      };
    default:
      return state;
  }
};

export const RestaurantContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(restaurantsReducer, {
    restaurants: []
  });

  return (
    <RestaurantContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RestaurantContext.Provider>
  );
};