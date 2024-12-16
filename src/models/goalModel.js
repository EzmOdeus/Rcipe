const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    caloriesGoal: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Goal", goalSchema);
