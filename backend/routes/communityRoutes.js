import express from 'express';
import {
  getAllPosts,
  createPost,
  likePost,
  commentOnPost,
  deleteCommunityPost,
} from '../controllers/communityController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getAllPosts);
router.post('/', protect, createPost);
router.post('/:id/like', protect, likePost);
router.post('/:id/comment', protect, commentOnPost);
router.route('/:postId')
  .delete(protect, deleteCommunityPost);
export default router;
