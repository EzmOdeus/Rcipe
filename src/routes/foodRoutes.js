const express = require("express");
const router = express.Router();
const {
  createFood,
  getFoods,
  deleteFood,
} = require("../controllers/foodController");
const { protect } = require("../middleware/authMiddleware");
// Routes
router.post("/", protect, createFood); // إضافة طعام جديد
router.get("/", protect, getFoods); // جلب قائمة الأطعمة
router.delete("/:id", protect, deleteFood); // حذف طعام


module.exports = router;
