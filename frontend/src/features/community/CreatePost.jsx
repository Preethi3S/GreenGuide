import { useState } from 'react';
import { useSelector } from 'react-redux';
import { createPost } from './communityAPI.js';

const CreatePost = ({ refreshPosts }) => {
  const { token } = useSelector((state) => state.auth);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageBase64, setImageBase64] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageBase64(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost({ title, content, imageBase64 }, token);
      setTitle('');
      setContent('');
      setImageBase64('');
      refreshPosts();
    } catch (err) {
      console.error('Post creation failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-white shadow-xl border border-secondary/10 rounded-3xl mb-8">
      <h3 className="text-2xl font-serif font-bold text-secondary mb-6">Share with the Community</h3>
      <input
        type="text"
        placeholder="Give your post a title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="block w-full bg-light-bg border border-secondary/20 p-4 mb-4 rounded-xl focus:border-primary focus:outline-none transition-colors placeholder-gray-400"
        required
      />
      <textarea
        placeholder="What's growing in your garden?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="block w-full bg-light-bg border border-secondary/20 p-4 mb-4 rounded-xl focus:border-primary focus:outline-none transition-colors placeholder-gray-400"
        rows="3"
        required
      />
      <div className="flex items-center justify-between">
        <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-secondary/10 file:text-secondary hover:file:bg-secondary/20 cursor-pointer"
        />
        <button
            type="submit"
            className="bg-secondary text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-primary transition-all shadow-lg shadow-secondary/20"
        >
            Post Update
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
