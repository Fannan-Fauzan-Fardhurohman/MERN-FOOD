const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSignUp = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "Email is already exists" });
  }
  const hasPwd = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email,
    password: hasPwd,
  });
  let token = jwt.sign({ email, id: newUser._id }, process.env.SECRET_KEY);
  res
    .status(201)
    .json({ message: "User created successfully", token, newUser });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  let user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    let token = jwt.sign({ email, id: user.id }, process.env.SECRET_KEY);
    return res.status(200).json({ message: "Login successful", token, user });
  } else {
    return res.status(400).json({ message: "Invalid email or password" });
  }
};

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ email: user.email });
};

module.exports = { userSignUp, userLogin, getUser };
