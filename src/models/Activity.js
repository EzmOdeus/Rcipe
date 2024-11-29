const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now }, // تاريخ النشاط
});

module.exports = mongoose.model("Activity", ActivitySchema);
