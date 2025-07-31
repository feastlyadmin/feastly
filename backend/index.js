require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // This line imports the package
const restaurantRoutes = require('./routes/restaurants');

// express app
const app = express();
const PORT = process.env.PORT || 4000;

// middleware
app.use(cors()); // This line tells the server to allow requests from other origins
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/restaurants', restaurantRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(PORT, () => {
      console.log('SUCCESS: MongoDB Connected & Server is listening on port', PORT);
    });
  })
  .catch((error) => {
    console.log('ERROR ❌:', error);
  });