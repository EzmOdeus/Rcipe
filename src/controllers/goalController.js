const Goal = require("../models/goalModel");

const setGoal = async (req, res) => {
  const { caloriesGoal } = req.body;
  try {
    let goal = await Goal.findOne({ user: req.user.id });
    if (goal) {
      goal.caloriesGoal = caloriesGoal;
      await goal.save();
    } else {
      goal = await Goal.create({ user: req.user.id, caloriesGoal });
    }
    res.status(200).json({ message: "Goal set successfully", goal });
  } catch (error) {
    res.status(500).json({ message: "Error setting goal", error });
  }
};

const getGoal = async (req, res) => {
  try {
    const goal = await Goal.findOne({ user: req.user.id });
    if (!goal) return res.status(404).json({ message: "No goal found" });
    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving goal", error });
  }
};

module.exports = { setGoal, getGoal };
