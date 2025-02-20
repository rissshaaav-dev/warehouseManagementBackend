const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  try {
    // check if all necessary fields are supplied
    if (!name || !email || !password) {
      const error = new Error(
        "Necessary fields missing: name, email, password"
      );
      error.statusCode = 400;
      throw error;
    }

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 400;
      throw error;
    }

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // crate new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // generate jwt token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "10d",
      }
    );

    // send success response
    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // check if all necessary fields are supplied
    if (!email || !password) {
      const error = new Error("Necessary fields missing: email, password");
      error.statusCode = 400;
      throw error;
    }

    // check if user exists in database
    const retrievedUser = await User.findOne({ email });
    if (!retrievedUser) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    // match passwords
    const isMatch = await bcrypt.compare(password, retrievedUser.password);
    if (!isMatch) {
      const error = new Error("Invalid credentials");
      error.statusCode = 400;
      throw error;
    }

    // generate jwt token
    const token = jwt.sign(
      { id: retrievedUser._id, role: retrievedUser.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "10d",
      }
    );

    // send response
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser };