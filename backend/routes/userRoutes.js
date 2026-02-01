import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  changePassword,
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.patch('/change-password', protect, changePassword);

export default router;
