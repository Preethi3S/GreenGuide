import express from 'express';
import {
  getUserPlants,
  addPlant,
  deletePlant,
  updatePlant,
} from '../controllers/plantController.js';
import { protect } from '../middlewares/authMiddleware.js';

import upload from '../middlewares/uploadMiddleware.js'; // ✅ Import your upload middleware
const router = express.Router();

router.route('/')
  .get(protect, getUserPlants)
  .post(protect,upload.single('image'), addPlant);

router.route('/:id')
  .put(protect, upload.single('image') ,updatePlant)
  .delete(protect, deletePlant);

export default router;
