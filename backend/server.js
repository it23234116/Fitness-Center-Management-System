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


/*const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_User}:${process.env.Password12345}@cluster1.4268e.mongodb.net/?appName=Cluster1`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //create a database and collection
    const database = client.db("fusers");
    const userCollection = database.collection("user");
    const userCollection = database.collection("admin");

    //classes routes here
    app.post('/new-class',()=>{
      const newClass = req.body;
      //newClass.availableSeats = parseInt(newClass.availableSeats);
      const result = await classesCollection.insertOne(newClass);
      res.send(result);

    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);*/

// Connect to MongoDB
connectDB();


//////////////////Routers 

const userRouters = require("./routes/user")
 app.use("/user", userRouters)
// Sample route
app.get('/users', async(req, res) => {
  res.send('Fitness Center API is running...');
});
/*app.get('/users', async(req, res) => {
  const query = (status: 'approved');
  const result = await usercollection.find().toArray();
  res.send(result);
});*/

// //manage user
// app.get('/user-manage',async(req,res) => {
//   const result = await usercollection.find().toArray();
//   re.send(result);
// })

// //update user
// app.put('/user-update',async(req,res) => {
//   const id =req.params.id;
   
// })

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