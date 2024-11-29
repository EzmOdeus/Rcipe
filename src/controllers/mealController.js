const Meal = require("../models/Meal");

// إضافة وجبة جديدة
exports.createMeal = async (req, res) => {
  try {
    const { user, foods, totalCalories } = req.body;
    const meal = new Meal({ user, foods, totalCalories });
    await meal.save();
    res.status(201).json({ message: "Meal added successfully", meal });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// جلب قائمة الوجبات
exports.getMeals = async (req, res) => {
  try {
    const meals = await Meal.find()
      .populate("user", "name email")
      .populate("foods", "name calories");
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// حذف وجبة
exports.deleteMeal = async (req, res) => {
  try {
    const { id } = req.params;
    const meal = await Meal.findByIdAndDelete(id);
    if (!meal) return res.status(404).json({ message: "Meal not found" });
    res.status(200).json({ message: "Meal deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
