import express from 'express';
import {
  createReminder,
  getReminders,
  updateReminder,
  deleteReminder,
} from '../controllers/reminderController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createReminder)
  .get(protect, getReminders);

router.route('/:id')
  .put(protect, updateReminder)
  .delete(protect, deleteReminder);

export default router;
