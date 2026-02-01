import axios from 'axios';

// Get all posts (public or protected depending on your backend)
export const getAllPosts = () => axios.get('/api/community');

// Create post (requires token)
export const createPost = (data, token) =>
  axios.post('/api/community', data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Like post (requires token)
export const likePost = (postId, token) =>
  axios.post(`/api/community/${postId}/like`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Comment on post (requires token)
export const commentOnPost = (postId, comment, token) =>
  axios.post(`/api/community/${postId}/comment`, { comment }, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deletePost = async (postId, token) => {
  const res = await axios.delete(`/api/community/${postId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

