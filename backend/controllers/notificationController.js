import asyncHandler from 'express-async-handler';
import Notification from '../models/notificationModel.js';
import User from '../models/userModel.js';
// @desc    Get all notifications for a user
// @route   GET /api/notifications
// @access  Private
export const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(notifications);
});

// @desc    Mark notification as read
// @route   PATCH /api/notifications/:id/read
// @access  Private
export const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    res.status(404);
    throw new Error('Notification not found');
  }

  if (notification.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Unauthorized');
  }

  notification.read = true;
  await notification.save();
  res.json({ message: 'Marked as read' });
});

// controllers/notificationController.js
export const sendNotification = asyncHandler(async (req, res) => {
  const { message, userId } = req.body;

  if (userId === 'all') {
    const users = await User.find({});
    await Promise.all(
      users.map((u) => Notification.create({ user: u._id, message }))
    );
  } else {
    await Notification.create({ user: userId, message });
  }

  res.status(200).json({ message: 'Notification sent' });
});

// @desc    Send a message to all admins
// @route   POST /api/notifications/message
// @access  Private
export const sendMessageToAdmin = asyncHandler(async (req, res) => {
  const { subject, body } = req.body;
  const senderId = req.user._id;

  // Find all admins
  const admins = await User.find({ role: 'admin' });

  if (!admins || admins.length === 0) {
    res.status(404);
    throw new Error('No admin users found');
  }

  // Create notifications for all admins
  const notifications = admins.map((admin) => ({
    user: admin._id,
    sender: senderId,
    title: subject,
    message: body,
  }));

  await Notification.insertMany(notifications);

  res.status(200).json({ message: 'Message sent to admin(s)' });
});
