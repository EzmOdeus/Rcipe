const express = require("express");
const router = express.Router();
const { getDailyLog } = require("../controllers/logController");
const {protect} = require("../middleware/authMiddleware");

router.get("/daily", protect, getDailyLog); // جلب السجل اليومي

module.exports = router;
