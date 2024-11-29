const express = require("express");
const router = express.Router();
const {
  createMeal,
  getMeals,
  deleteMeal,
} = require("../controllers/mealController");

// Routes
router.post("/", createMeal); // إضافة وجبة جديدة
router.get("/", getMeals); // جلب قائمة الوجبات
router.delete("/:id", deleteMeal); // حذف وجبة

module.exports = router;
