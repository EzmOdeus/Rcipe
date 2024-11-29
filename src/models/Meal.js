const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  foods: [{ type: mongoose.Schema.Types.ObjectId, ref: "Food" }],
  totalCalories: { type: Number, required: true },
  date: { type: Date, default: Date.now }, // تاريخ الوجبة
});

module.exports = mongoose.model("Meal", MealSchema);
