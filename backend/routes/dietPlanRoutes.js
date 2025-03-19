const express = require('express');
const router = express.Router();
const DietPlan = require('../models/DietPlan'); // Import DietPlan model

// Route to get all diet plans
router.get('/api/diet-plans', async (req, res) => {
  try {
    const dietPlans = await DietPlan.find(); // Retrieve all diet plans from the database
    res.json(dietPlans);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching diet plans' });
  }
});

// Route to create a new diet plan
router.post('/api/diet-plans', async (req, res) => {
  const { mealType, foodItems, calories, macros } = req.body;

  try {
    const newDietPlan = new DietPlan({
      mealType,
      foodItems,
      calories,
      macros,
    });

    await newDietPlan.save(); // Save the new diet plan to the database
    res.status(201).json(newDietPlan); // Return the newly created diet plan
  } catch (err) {
    res.status(500).json({ message: 'Error creating diet plan' });
  }
});

module.exports = router;
