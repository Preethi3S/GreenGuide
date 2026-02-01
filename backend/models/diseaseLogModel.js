import mongoose from 'mongoose';

const diseaseLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  plant: { type: mongoose.Schema.Types.ObjectId, ref: 'Plant' },
  imageUrl: { type: String, required: true },
  detectedDisease: String,
  confidence: Number,
  timestamp: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

export default mongoose.model('DiseaseLog', diseaseLogSchema);
