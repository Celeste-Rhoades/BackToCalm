import User from "../models/User";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

// Register new user
export const signup = async (req: Request, res: Response) => {
  try {
    // Get user data from request
    const { username, email, password } = req.body;

    // Check if username already exists
    const exisitingUser = await User.findOne({ username });
    if (exisitingUser) {
      return res.status(400).json({ error: "Username is Already Taken" });
    }

    // Create new user (password will be hashed by schema middleware)
    const newUser = new User({
      username,
      email,
      password,
    });
    await newUser.save();

    // Create JWT token with user's ID
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    // Return token and user data
    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Server error during signup" });
  }
};

// Login existing user
export const login = async (req: Request, res: Response) => {
  try {
    // Get credentials from request
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    // Check if passwords match
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Create JWT token with user's ID
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    // Return token and user data
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error during login" });
  }
};
