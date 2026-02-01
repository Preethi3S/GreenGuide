import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // ✅ This enables populate to work
    required: true,
  },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  adminReply: { type: String },
  isResolved: { type: Boolean, default: false },
}, {
  timestamps: true,
});

const Message = mongoose.model('Message', messageSchema);
export default Message;
