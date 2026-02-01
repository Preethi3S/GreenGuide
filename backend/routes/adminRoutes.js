import express from 'express';
import {
  getAllUsers,
  banUser,
  getStats,
} from '../controllers/adminController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.use(protect, isAdmin);

router.get('/users', getAllUsers);
router.patch('/users/:id/ban', banUser);
router.get('/stats', getStats);

export default router;
