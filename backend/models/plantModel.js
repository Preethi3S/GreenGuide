import mongoose from 'mongoose';

const plantSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  species: { type: String, required: true },
  description: String,
  imageUrl: String,
  waterSchedule: String,
  lastWateredAt: Date,
  plantedDate: Date,
  sunlightRequirement: String,
  soilType: String,
  healthStatus: String,
  growthStage: String,
  tags: [String],
  location: String,
  idealTemperature: String,
  isPublic: { type: Boolean, default: false },
}, { timestamps: true });

const Plant = mongoose.model('Plant', plantSchema);
export default Plant;
