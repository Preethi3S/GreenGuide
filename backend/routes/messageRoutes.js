import express from 'express';
import { sendMessage, getAllMessages, replyMessage } from '../controllers/messageController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/roleMiddleware.js';
import Message from '../models/Message.js';
const router = express.Router();
import asyncHandler from 'express-async-handler';

router.post('/', protect, asyncHandler(sendMessage));                    // user sends message
router.get('/', protect, isAdmin, asyncHandler(getAllMessages));         // admin fetches all
router.put('/:id/reply', protect, isAdmin, asyncHandler(replyMessage));  // admin replies
// GET /api/messages/mine - Get messages of the logged-in user
router.get('/mine', protect, asyncHandler(async (req, res) => {
  const messages = await Message.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(messages);
}));

export default router;
