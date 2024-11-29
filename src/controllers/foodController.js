const Food = require("../models/Food");

// إضافة طعام جديد
exports.createFood = async (req, res) => {
  try {
    const { name, category, calories, createdBy } = req.body;
    const food = new Food({ name, category, calories, createdBy });
    await food.save();
    res.status(201).json({ message: "Food added successfully", food });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// جلب قائمة الأطعمة
exports.getFoods = async (req, res) => {
  try {
    const foods = await Food.find().populate("createdBy", "name email");
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// حذف طعام
exports.deleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Food.findByIdAndDelete(id);
    if (!food) return res.status(404).json({ message: "Food not found" });
    res.status(200).json({ message: "Food deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
