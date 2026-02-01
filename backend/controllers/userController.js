import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';

// @desc    Get current user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.name = req.body.name || user.name;

  // Extended preferences (expect JSON string if sent via FormData)
  if (req.body.preferences) {
    const parsedPreferences = JSON.parse(req.body.preferences);

    user.preferences.notificationFrequency =
      parsedPreferences.notificationFrequency || user.preferences.notificationFrequency;

    user.preferences.gardeningLevel =
      parsedPreferences.gardeningLevel || user.preferences.gardeningLevel;

    user.preferences.gardenType =
      parsedPreferences.gardenType || user.preferences.gardenType;

    user.preferences.preferredPlants =
      parsedPreferences.preferredPlants || user.preferences.preferredPlants;

    user.preferences.plantTypes =
      parsedPreferences.plantTypes || user.preferences.plantTypes;
  }

  if (req.body.password) {
    user.password = await bcrypt.hash(req.body.password, 10);
  }

  if (req.file) {
    // Convert buffer to base64
    user.avatar = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
  }

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    avatar: updatedUser.avatar,
    preferences: updatedUser.preferences,
    role: updatedUser.role,
    createdAt: updatedUser.createdAt,
  });
});

// @desc    Change user password
// @route   PUT /api/users/change-password
// @access  Private
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    res.status(401);
    throw new Error('Current password is incorrect');
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ message: 'Password updated successfully' });
});
