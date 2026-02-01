import Message from '../models/Message.js';
import asyncHandler from 'express-async-handler';

// User sends a message
export const sendMessage = asyncHandler(async (req, res) => {
  const { subject, body } = req.body;

  const message = await Message.create({
    user: req.user._id,
    subject,
    body,
  });

  res.status(201).json(message);
});

// Admin gets all messages
export const getAllMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find().populate('user', 'name email'); // ✅ Populating user
  res.json(messages);
});

// Admin replies to a message
export const replyMessage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { reply } = req.body;

  const message = await Message.findById(id);
  if (!message) throw new Error('Message not found');

  message.adminReply = reply;
  message.isResolved = true;
  await message.save();

  res.json({ message: 'Replied successfully' });
});
