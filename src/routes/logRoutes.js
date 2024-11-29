const express = require("express");
const router = express.Router();
const { getDailyLog } = require("../controllers/logController");
const authenticate = require("../middleware/authMiddleware");

router.get("/daily", authenticate, getDailyLog); // جلب السجل اليومي

module.exports = router;
