import express from 'express';
import {
  addWaterLog,
  getAllWaterLogs,
  updateWaterLog,
  deleteWaterLog,
} from '../controllers/waterTrackerController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add', protect, addWaterLog);
router.get('/all-logs', protect, getAllWaterLogs);
router.put('/:id', protect, updateWaterLog);     // ✅ New
router.delete('/:id', protect, deleteWaterLog);  // ✅ New

export default router;
