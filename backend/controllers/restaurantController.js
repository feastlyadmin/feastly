const Restaurant = require('../models/restaurantModel');
const mongoose = require('mongoose');

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

  try {
    const restaurant = await Restaurant.create({ name, cuisine, rating });
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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
    }, { new: true }); // {new: true} ensures the updated document is returned

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