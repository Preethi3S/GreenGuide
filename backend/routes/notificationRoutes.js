import express from 'express';
import {
  getNotifications,
  markAsRead,
  sendMessageToAdmin, // add this
} from '../controllers/notificationController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getNotifications);
router.patch('/:id/read', protect, markAsRead);
router.post('/message', protect, sendMessageToAdmin); // <-- new route

export default router;
