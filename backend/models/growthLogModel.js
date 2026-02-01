import mongoose from 'mongoose';

const growthLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  plant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plant',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  heightInCm: Number,
  leavesCount: Number,
  healthStatus: String,
  photoUrl: String,
  notes: String,
}, {
  timestamps: true,
});

export default mongoose.model('GrowthLog', growthLogSchema);
