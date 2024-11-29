const express = require("express");
const bodyParser = require("body-parser");
// const session = require("cookie-session");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(express.json());
// app.use(cors());
// Routes
const logRoutes = require("./routes/logRoutes");
const authRoutes = require("./routes/authRoutes");
const foodRoutes = require("./routes/foodRoutes");
const mealRoutes = require("./routes/mealRoutes");
require("./passport"); // استدعاء ملف الإعداد
app.get("/", (req, res) => {
  res.send("hello");
});

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key", // مفتاح سري لتوقيع الجلسة
    resave: false, // لا تحفظ الجلسة إذا لم يتم تعديلها
    saveUninitialized: false, // لا تحفظ الجلسات الفارغة
    cookie: { secure: false }, // إذا كنت تستخدم HTTPS فقط، اجعلها true
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/logs", logRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/meals", mealRoutes);

module.exports = app;
