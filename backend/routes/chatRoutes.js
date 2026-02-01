import express from 'express';
import { chatWithGardeningBot } from '../controllers/chatController.js';
const router = express.Router();

router.post('/', chatWithGardeningBot);

export default router;
