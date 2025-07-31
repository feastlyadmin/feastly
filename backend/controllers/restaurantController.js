const Restaurant = require('../models/restaurantModel');
const mongoose = require('mongoose');

// ... (getRestaurants, getRestaurant functions are unchanged) ...
// GET all restaurants
const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({}).sort({ createdAt: -1 });
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET a single restaurant
const getRestaurant = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such restaurant found' });
  }
  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      return res.status(404).json({ error: 'No such restaurant found' });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// CREATE a new restaurant
const createRestaurant = async (req, res) => {
  const { name, cuisine, rating } = req.body;

  // --- START OF DEBUGGING LOGS ---
  console.log('--- BACKEND RECEIVED REQUEST ---');
  console.log('Request Body:', req.body);
  console.log(`Value of name: '${name}', Type: ${typeof name}`);
  console.log(`Value of cuisine: '${cuisine}', Type: ${typeof cuisine}`);
  // --- END OF DEBUGGING LOGS ---

  let emptyFields = [];

  if (!name) {
    emptyFields.push('name');
  }
  if (!cuisine) {
    emptyFields.push('cuisine');
  }
  
  if (emptyFields.length > 0) {
    console.log('Validation FAILED. Empty fields:', emptyFields);
    return res.status(400).json({ error: 'Please fill in all required fields', emptyFields });
  }

  // add doc to db
  try {
    console.log('Validation PASSED. Attempting to create document...');
    const restaurant = await Restaurant.create({ name, cuisine, rating });
    res.status(200).json(restaurant);
  } catch (error) {
    console.log('!!! DATABASE ERROR !!!', error.message);
    res.status(400).json({ error: error.message });
  }
};


// ... (deleteRestaurant, updateRestaurant functions are unchanged) ...
// DELETE a restaurant
const deleteRestaurant = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such restaurant found' });
  }
  try {
    const restaurant = await Restaurant.findOneAndDelete({ _id: id });
    if (!restaurant) {
      return res.status(404).json({ error: 'No such restaurant found' });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE a restaurant
const updateRestaurant = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such restaurant found' });
  }
  try {
    const restaurant = await Restaurant.findOneAndUpdate({ _id: id }, {
      ...req.body
    }, { new: true });
    if (!restaurant) {
      return res.status(404).json({ error: 'No such restaurant found' });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  deleteRestaurant,
  updateRestaurant
};