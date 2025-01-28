import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "dotenv";
config();
import mongoose from "mongoose";
import {
  validateSignup,
  validateLogin,
  validateuserUpdate,
} from "../validator/user.validator.js";

//JWT secret key and expiration time
const jwtSecret = process.env.JWT_SECRET;
const jwtExpirySeconds = process.env.JWT_EXPIRY;

//Generate JWT token
const generateToken = (user) => {
  const token = jwt.sign({ id: user._id }, jwtSecret, {
    algorithm: "HS256",
    expiresIn: jwtExpirySeconds,
  });
  return token;
};

//Sign up user
const signup = async (req, res) => {
  try {
    const { error } = validateSignup(req.body);

    if (error) {
      return res.status(400).json({ message: error.errors[0].message });
    }

    const { name, email, password, username, role } = req.body;

    //Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //Create new user
    const user = await User.create({
      name,
      email,
      password,
      username,
      role: role || "user",
    });

    //Generate JWT token
    const token = generateToken(user._id);

    return res.status(201).json({
      message: "User created succesfully",
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

//login user
const login = async (req, res) => {
  try {
    const { error } = validateLogin(req.body);

    if (error) {
      return res.status(400).json({ message: error.errors[0].message });
    }

    const { email, password } = req.body;

    //Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    //Check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    //Generate JWT token
    const token = generateToken(user._id);

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

//Get User Profile
const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User found", data: user });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

//Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json({ message: "All users", data: users });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

//Update User Profile
const updateUserById = async (req, res) => {
  try {
    const { error } = validateuserUpdate(req.body);

    if (error) {
      return res.status(400).json({ message: error.errors[0].message });
    }

    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ message: "Invalid User ID" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User Updated succsesfully", data: updatedUser });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

//Delete User Profile
const deleteUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user._id;
    const currentUserRole = req.user.role;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).json({ message: "Invalid User ID" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (currentUserId !== userId && currentUserRole !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete the user" });
    }

    await User.findByIdAndDelete(userId);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

//Export
export {
  signup,
  login,
  getUserById,
  updateUserById,
  deleteUserById,
  getAllUsers,
};
