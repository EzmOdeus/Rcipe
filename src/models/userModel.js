const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String, unique: true }, // مخصص للمستخدمين الذين يستخدمون Google OAuth
});

module.exports = mongoose.model("User", userSchema);
