import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getAllPosts } from './communityAPI.js';
import CreatePost from './CreatePost';
import PostCard from './PostCard';

const CommunityFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const { data } = await getAllPosts();
    const currentUserId = JSON.parse(localStorage.getItem('userInfo'))?._id;
    setPosts(data.map(post => ({ ...post, currentUserId })));
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-light-bg p-6 font-sans">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <span className="bg-primary/10 text-primary p-3 rounded-xl text-2xl">🌱</span>
          <h1 className="text-4xl font-serif font-bold text-secondary">Community Garden</h1>
        </div>

        <CreatePost onPostCreated={fetchPosts} />
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map(post => (
              <PostCard key={post._id} post={post} refreshPosts={fetchPosts} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CommunityFeed;
