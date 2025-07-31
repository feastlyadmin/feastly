const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  cuisine: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);