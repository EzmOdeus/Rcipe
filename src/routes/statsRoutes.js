const express = require("express");
const router = express.Router();
const { getWeeklyStats } = require("../controllers/statsController");
const { protect } = require("../middleware/authMiddleware");

router.get("/weekly", protect, getWeeklyStats); // إحصائيات الأسبوع

module.exports = router;
