const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const setupSwagger = require("./swagger");
require("./services/passport"); // لتهيئة Google OAuth

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


// إعداد Swagger
setupSwagger(app);

// Routes
app.use("/api/users", userRoutes);


// Middleware لـ Passport
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes);
module.exports = app;
