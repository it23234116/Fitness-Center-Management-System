const mongoose = require('mongoose');

// Define the schema for the diet plan
const dietPlanSchema = new mongoose.Schema({
  mealType: {
    type: String, // E.g., breakfast, lunch, dinner, snack
    required: true,
  },
  foodItems: [
    {
      type: String,
      required: true,
    },
  ],
  calories: {
    type: Number,
    required: true,
  },
  // You can add more fields like "macros" (protein, carbs, fat)
  macros: {
    protein: { type: Number, required: false },
    carbs: { type: Number, required: false },
    fats: { type: Number, required: false },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const DietPlan = mongoose.model('DietPlan', dietPlanSchema);

module.exports = DietPlan;



// Sample Comment