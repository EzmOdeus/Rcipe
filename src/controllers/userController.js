// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const registerUser = async (req, res) => {
//   const { name, email, password, age, weight, height } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({ message: "Please provide all fields" });
//   }

//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     return res.status(400).json({ message: "User already exists" });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = await User.create({
//     name,
//     email,
//     password: hashedPassword,
//     age,
//     weight,
//     height,
//   });

//   res.status(201).json({ message: "User registered successfully", user });
// };

// const loginUser = async (req, res) => {
// //   const { email, password } = req.body;

// //   const user = await User.findOne({ email });
// //   console.log("🚀 ~ loginUser ~ user:", user)
// //   const isMatch = await bcrypt.compare(password, user.password);
// //     console.log("🚀 ~ loginUser ~ isMatch:", isMatch)
// //     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
// //       expiresIn: "7d",
// //     });
// //     console.log("🚀 ~ loginUser ~ token:", token)
// // if (user&& isMatch) {
// //   res.json({ token ,user});
  
// // } else {
// //   res.status(400).json({ message: "Invalid credentials" });
// // }

// const { email, password } = req.body;

// const user = await User.findOne({ email });

// if (user && (await user.matchPassword(password))) {
//   const token = generateToken(user._id);
//   res.json({
//     _id: user._id,
//     name: user.name,
//     email: user.email,
//     token,
//   });
// } else {
//   res.status(401).json({ message: "Invalid email or password" });
// }
// };
// const getUserProfile = async (req, res) => {
//   if (!req.user) {
//     return res.status(401).json({ message: "Not authorized" });
//   }
//   res.json(req.user);
// };

// module.exports = { registerUser, loginUser, getUserProfile };
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const registerUser = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    age: Joi.number().min(0).optional(),
    calorieGoal:Joi.number().min(0).optional(),
    weight: Joi.number().min(0).optional(),
    height: Joi.number().min(0).optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { name, email, password, age, weight, height, calorieGoal } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      calorieGoal,
      age,
      weight,
      height,
    });

    const { password: _, ...userWithoutPassword } = user._doc;
    res
      .status(201)
      .json({
        message: "User registered successfully",
        user: userWithoutPassword,
      });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
 

    if (isMatch) {
      const token = generateToken(user._id);
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("🚀 ~ Error in loginUser:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};


const getUserProfile = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }
  res.json(req.user);
};

module.exports = { registerUser, loginUser, getUserProfile };
