
import express from 'express'

import { protect } from '../middlewares/authMiddleware.js';
import {
  createGarden,
  getUserGarden,
  updateGardenLayout
} from '../controllers/gardenController.js';

const router = express.Router();

router.post("/", protect, createGarden);
router.get("/", protect, getUserGarden);
router.put("/layout", protect, updateGardenLayout);
export default router;