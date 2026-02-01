import mongoose from 'mongoose';

const communityPostSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true }, 
  imageUrl: String, 
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    comment: String, 
    createdAt: { type: Date, default: Date.now }, 
  }],
  title: { type: String, required: [true, 'Title is required'], default: '' }

}, {
  timestamps: true, 
});

export default mongoose.model('CommunityPost', communityPostSchema);
