const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const passport = require("passport");


// بدء تسجيل الدخول باستخدام Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// إعادة التوجيه من Google بعد تسجيل الدخول
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login-failed" }),
  (req, res) => {
    res.redirect("/"); // إعادة التوجيه بعد النجاح
  }
);

// تسجيل الخروج
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out" });
    }
    res.redirect("/");
  });
});



router.post("/register", register);
router.post("/login", login);

module.exports = router;
