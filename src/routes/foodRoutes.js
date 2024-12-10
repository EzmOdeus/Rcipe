const express = require("express");
const router = express.Router();
const {
  createFood,
  getFoods,
  deleteFood,
} = require("../controllers/foodController");
const authenticate = require("../middleware/authMiddleware");
// Routes
router.post("/", authenticate, createFood); // إضافة طعام جديد
router.get("/", protect, getFoods); // جلب قائمة الأطعمة
router.delete("/:id", deleteFood); // حذف طعام
router.post("/add", protect, addFood);

module.exports = router;
