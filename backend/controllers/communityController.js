import asyncHandler from 'express-async-handler';
import CommunityPost from '../models/communityModel.js';
import { v2 as cloudinary } from 'cloudinary';

// Cloudinary config inside the same file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// @desc    Create new post
// @route   POST /api/community
// @access  Private
export const createPost = asyncHandler(async (req, res) => {
  const { title, content, imageBase64 } = req.body;
  let imageUrl = '';

  // Upload image to Cloudinary if provided
  if (imageBase64) {
    try {
      const result = await cloudinary.uploader.upload(imageBase64, {
        folder: 'community_posts',
      });
      imageUrl = result.secure_url;
    } catch (error) {
      res.status(500);
      throw new Error('Image upload failed');
    }
  }

  const post = await CommunityPost.create({
    author: req.user._id,
    title,
    content,
    imageUrl,
  });

  res.status(201).json(post);
});

// @desc    Get all community posts
// @route   GET /api/community
// @access  Public
export const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await CommunityPost.find()
    .populate('author', 'name')
    .sort({ createdAt: -1 });

  res.json(posts);
});

// @desc    Like a post
// @route   POST /api/community/:id/like
// @access  Private
export const likePost = asyncHandler(async (req, res) => {
  const post = await CommunityPost.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  if (!post.likes.includes(req.user._id)) {
    post.likes.push(req.user._id);
    await post.save();
  }

  res.json({ message: 'Post liked' });
});

// @desc    Comment on a post
// @route   POST /api/community/:id/comment
// @access  Private
export const commentOnPost = asyncHandler(async (req, res) => {
  const { comment } = req.body;

  if (!comment || comment.trim() === '') {
    res.status(400);
    throw new Error('Comment text is required');
  }

  const post = await CommunityPost.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  const newComment = {
    user: req.user._id,
    comment,
    createdAt: new Date(),
  };

  post.comments.push(newComment);

  // Save without triggering full schema validation
  await post.save({ validateBeforeSave: false });

  res.status(201).json({ message: 'Comment added', comment: newComment });
});

// @desc    Delete a community post
// @route   DELETE /api/community/:postId
// @access  Private (only post owner or admin)
export const deleteCommunityPost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const post = await CommunityPost.findById(postId);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  // Allow only the author or an admin to delete
  if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to delete this post');
  }

  await post.deleteOne();

  res.status(200).json({ message: 'Post deleted successfully' });
});

