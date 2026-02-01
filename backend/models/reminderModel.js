import mongoose from 'mongoose';

const reminderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  plant: { type: mongoose.Schema.Types.ObjectId, ref: 'Plant' },
  title: { type: String, required: true },
  scheduledAt: { type: Date, required: true },
  repeat: { type: String, enum: ['none', 'daily', 'weekly'], default: 'none' },
  notified: { type: Boolean, default: false },
}, { timestamps: true });

const Reminder = mongoose.model('Reminder', reminderSchema);
export default Reminder;
