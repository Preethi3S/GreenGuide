import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CommentBox from './CommentBox';
import { deletePost, likePost } from './communityAPI.js';

const PostCard = ({ post, refreshPosts }) => {
  const [liked, setLiked] = useState(post.likes.includes(post.currentUserId));
  const { token, user } = useSelector((state) => state.auth);

  const handleLike = async () => {
    try {
      await likePost(post._id, token);
      setLiked(true);
      refreshPosts();
    } catch (err) {
      console.error('Like failed:', err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(post._id, token);
        refreshPosts();
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  const isAuthor = user && post.author && user._id === post.author._id;

  return (
    <motion.div
      className="border border-secondary/10 rounded-3xl p-8 shadow-xl bg-white mb-6 hover:shadow-2xl transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-4 mb-6">
         <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold text-xl">
            {post.author?.name?.charAt(0) || 'U'}
         </div>
         <div>
            <h3 className="text-xl font-serif font-bold text-secondary leading-tight">{post.title}</h3>
            <p className="text-sm text-gray-400">Posted by <span className="text-primary font-bold">{post.author?.name}</span></p>
         </div>
      </div>
      
      <p className="text-gray-600 mb-6 leading-relaxed text-lg">{post.content}</p>

      {post.imageUrl && (
        <div className="rounded-2xl overflow-hidden mb-6 shadow-md">
           <img
             src={post.imageUrl}
             alt="post"
             className="w-full max-h-96 object-cover hover:scale-105 transition-transform duration-700"
           />
        </div>
      )}

      <div className="flex items-center justify-between border-t border-secondary/10 pt-6">
        <div className="flex items-center gap-6">
            <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            disabled={liked}
            className={`flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-xl transition-colors ${liked ? 'bg-primary/10 text-primary' : 'bg-light-bg text-gray-500 hover:bg-secondary/10'}`}
            >
            <span>👍</span> {post.likes.length} Likes
            </motion.button>

            <span className="text-sm text-gray-500 font-medium flex items-center gap-2">
               <span>💬</span> {post.comments.length} comments
            </span>
        </div>

        {isAuthor && (
        <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 text-sm font-bold px-4 py-2 rounded-xl hover:bg-red-50 transition-colors"
        >
            Delete
        </motion.button>
        )}
      </div>

      <div className="mt-6 bg-light-bg p-6 rounded-2xl border border-secondary/10">
        <CommentBox postId={post._id} onCommented={refreshPosts} />
        <ul className="mt-6 space-y-4">
          {post.comments.map((c, idx) => (
            <li key={idx} className="text-sm text-gray-700 border-b border-secondary/10 pb-3 last:border-0 last:pb-0">
              <div className="flex items-start gap-3">
                 <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-xs text-secondary font-bold mt-0.5">
                    {c.user?.name?.charAt(0) || 'U'}
                 </div>
                 <div>
                    <strong className="text-secondary font-serif block mb-1">{c.user?.name || 'User'}</strong>
                    <p className="text-gray-600">{c.comment}</p>
                 </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default PostCard;
