// routes/encyclopediaRoutes.js
import express from 'express';
import {
  getAllEncyclopediaPlants,
  getEncyclopediaPlantById,
  createEncyclopediaPlant,
  updateEncyclopediaPlant,
  deleteEncyclopediaPlant,
} from '../controllers/encyclopediaController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { isAdmin } from '../middlewares/roleMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js'; // if you're handling images

const router = express.Router();

// Public routes
router.get('/', getAllEncyclopediaPlants);
router.get('/:id', getEncyclopediaPlantById);

// Admin-only routes
router.post('/', protect, isAdmin, upload.single('image'), createEncyclopediaPlant);
router.put('/:id', protect, isAdmin, upload.single('image'), updateEncyclopediaPlant);
router.delete('/:id', protect, isAdmin, deleteEncyclopediaPlant);

export default router;
