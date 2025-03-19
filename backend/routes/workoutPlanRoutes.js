const express = require('express');
const router = express.Router();
const WorkoutPlan = require('../models/WorkoutPlan'); // Import WorkoutPlan model

// Route to get all workout plans
router.get('/api/workout-plans', async (req, res) => {
  try {
    const workoutPlans = await WorkoutPlan.find(); // Retrieve all workout plans from the database
    res.json(workoutPlans);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching workout plans' });
  }
});

// Route to create a new workout plan
router.post('/api/workout-plans', async (req, res) => {
  const { exerciseName, sets, reps, restTime, category } = req.body;

  try {
    const newWorkoutPlan = new WorkoutPlan({
      exerciseName,
      sets,
      reps,
      restTime,
      category,
    });

    await newWorkoutPlan.save(); // Save the new workout plan to the database
    res.status(201).json(newWorkoutPlan); // Return the newly created workout plan
  } catch (err) {
    res.status(500).json({ message: 'Error creating workout plan' });
  }
});

module.exports = router;
