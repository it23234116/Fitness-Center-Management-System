const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env

const app = express();

// Middleware for JSON body parsing
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
; // No need for deprecated options
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err);
    process.exit(1); // Exit process with failure if MongoDB connection fails
  }
};

// Connect to MongoDB
connectDB();


//Routers 

const userRouters = require("./routes/user")
 app.use("/user", userRouters)


// Set the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
