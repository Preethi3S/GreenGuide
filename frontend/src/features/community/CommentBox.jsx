import { motion } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { commentOnPost } from './communityAPI.js';

const CommentBox = ({ postId, onCommented }) => {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return toast.error('Comment cannot be empty');
    try {
      setLoading(true);
      await commentOnPost(postId, comment, token);
      setComment('');
      onCommented();
      toast.success('Comment posted!');
    } catch (err) {
      console.error('Comment failed:', err);
      toast.error(err.response?.data?.message || 'Failed to comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 mt-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <input
        className="flex-1 border border-secondary/20 px-4 py-3 rounded-xl shadow-sm focus:outline-none focus:border-primary transition-all bg-white"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        disabled={loading}
      />
      <motion.button
        whileTap={{ scale: 0.9 }}
        type="submit"
        disabled={loading}
        className="text-white bg-secondary hover:bg-primary px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-secondary/20 disabled:opacity-50 disabled:shadow-none"
      >
        {loading ? '...' : 'Send'}
      </motion.button>
    </motion.form>
  );
};

export default CommentBox;
