import mongoose from 'mongoose';

const encyclopediaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String },
  description: { type: String },
  soilType: { type: String },
  season: { type: String },
  yield: { type: String },
  imageUrl: { type: String },
}, { timestamps: true });

export default mongoose.model('EncyclopediaPlant', encyclopediaSchema);
