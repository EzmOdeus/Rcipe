const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  age: { type: Number, required: true },
  calorieGoal: { type: Number, default: 2000 },
  preferredUnit: { type: String, default: "calories" },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Food" }],
});

// تشفير كلمة المرور قبل الحفظ
// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

module.exports = mongoose.model("Users", UserSchema);
