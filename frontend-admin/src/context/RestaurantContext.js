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
    default:
      return state;
  }
};

export const RestaurantContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(restaurantsReducer, {
    restaurants: [] // Using an empty array as the initial state
  });

  return (
    <RestaurantContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RestaurantContext.Provider>
  );
};