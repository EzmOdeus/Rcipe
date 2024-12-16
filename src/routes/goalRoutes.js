const express = require("express");
const router = express.Router();
const { setGoal, getGoal } = require("../controllers/goalController");
const { protect } = require("../middleware/authMiddleware");

router.post("/set", protect, setGoal); // تعيين هدف
router.get("/", protect, getGoal); // استرجاع الهدف الحالي

module.exports = router;
