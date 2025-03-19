const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env

const app = express();

// Middleware for JSON body parsing
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI); // No need for deprecated options
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err);
    process.exit(1); // Exit process with failure if MongoDB connection fails
  }
};

// Connect to MongoDB
connectDB();

// Sample route
app.get('/', (req, res) => {
  res.send('Fitness Center API is running...');
});

// Set the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//-----------------Tharindu (Workout & Diet Plan)--------------------------

// ####### Workout Plan ##########

const workoutPlanRoutes = require('./routes/workoutPlanRoutes'); // Import workout plan routes
app.use(workoutPlanRoutes);

// ####### Workout Plan ##########

const dietPlanRoutes = require('./routes/dietPlanRoutes'); // Import diet plan routes
app.use(dietPlanRoutes);


//-----------------Tharindu (Workout & Diet Plan)--------------------------
//Sample 