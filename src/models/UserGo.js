const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  googleId: { type: String, unique: true }, // معرّف Google
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("UserGo", UserSchema);
