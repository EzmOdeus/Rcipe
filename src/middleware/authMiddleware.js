const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // استخراج التوكن

      // التحقق من التوكن وفك تشفيره
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // البحث عن المستخدم وتخزينه في الطلب
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
