const express = require("express");
const passport = require("passport");
const router = express.Router();

// بدء عملية تسجيل الدخول باستخدام Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const { user, token } = req.user;
    res.json({ message: "Login successful", user, token });
  }
);

module.exports = router;
