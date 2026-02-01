import express from 'express';
import { detectDisease } from '../controllers/diseaseController.js';
import { protect } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js'; // Assuming multer setup

const router = express.Router();

// POST /api/disease/detect
router.post('/detect', protect, upload.single('image'), detectDisease);

export default router;
