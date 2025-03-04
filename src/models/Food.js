const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  calories: { type: Number, required: true },
  protein: { type: Number },
  carbohydrate: { type: Number },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Food", FoodSchema);
