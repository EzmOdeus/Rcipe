const express = require("express");
const router = express.Router();
const {
  createMeal,
  getMeals,
  deleteMeal,
} = require("../controllers/mealController");
const { protect } = require("../middleware/authMiddleware");

// Routes
router.post("/",protect, createMeal); // إضافة وجبة جديدة
router.get("/",protect, getMeals); // جلب قائمة الوجبات
router.delete("/:id",protect, deleteMeal); // حذف وجبة

module.exports = router;
