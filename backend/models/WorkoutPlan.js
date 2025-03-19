const mongoose = require('mongoose');

// Define the schema for the workout plan
const workoutPlanSchema = new mongoose.Schema({
  exerciseName: {
    type: String,
    required: true,
  },
  sets: {
    type: Number,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  restTime: {
    type: String,
    required: true,
  },
  // You can add more fields like category (e.g., strength, cardio, etc.)
  category: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const WorkoutPlan = mongoose.model('WorkoutPlan', workoutPlanSchema);

module.exports = WorkoutPlan;
