import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { config } from '../config/env.js';

// Email regex (simple RFC-compliant check)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, adminCode } = req.body;

  // 1. Validate email format
  if (!emailRegex.test(email)) {
    res.status(400);
    throw new Error('Invalid email format');
  }

  // 2. Validate password length
  if (!password || password.length < 6) {
    res.status(400);
    throw new Error('Password must be at least 6 characters');
  }

  // 3. Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // 4. Hash password
  const hashedPassword = await bcrypt.hash(password, 12);
  const isAdmin = adminCode === config.adminCode;

  // 5. Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: isAdmin ? 'admin' : 'user',
  });

  // 6. Respond
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});


// @desc    Login user
// @route   POST /api/auth/login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const isMatch = user && (await bcrypt.compare(password, user.password));

  if (user.isBanned) {
  res.status(403);
  throw new Error('Your account has been banned. Contact support.');
}

  if (user && isMatch) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

// @desc    Logout user (just frontend token deletion)
// @route   POST /api/auth/logout
export const logoutUser = asyncHandler(async (req, res) => {
  // Client can just delete token from local storage
  res.status(200).json({ message: 'Logged out successfully' });
});

// @desc    Get current user profile
// @route   GET /api/auth/me
export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

// Utility to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, config.jwtSecret, { expiresIn: '30d' });
};
