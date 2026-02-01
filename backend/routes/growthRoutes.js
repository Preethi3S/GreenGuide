import express from 'express';
import {
  addGrowthLog,
  getGrowthLogs,
  deleteGrowthLog,
  updateGrowthLog,
  searchGrowthLogs,
  getAllUserGrowthLogs,
} from '../controllers/growthTrackerController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Add growth log to a plant
router.post('/:plantId', protect, addGrowthLog);

// Get all logs for a specific plant
router.get('/:plantId', protect, getGrowthLogs);

// Delete a specific log
router.delete('/log/:logId', protect, deleteGrowthLog);

// Update a specific log
router.put('/log/:logId', protect, updateGrowthLog);

// Search logs
router.get('/search', protect, searchGrowthLogs);

// Get all logs of the user (optionally filtered)
router.get('/', protect, getAllUserGrowthLogs);

export default router;
