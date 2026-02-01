import mongoose from "mongoose";

const PlantItemSchema = new mongoose.Schema({
  name: String,               // e.g., Tomato
  type: String,               // 'seed' | 'plant' | 'tree'
  position: {
    x: Number,
    y: Number,
  },
  size: {
    w: Number,
    h: Number,
  },
  icon: String,               // (optional) for UI display
});

const GardenSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  width: Number,
  height: Number,
  layout: [PlantItemSchema],  // All placed plants
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Garden = mongoose.model("Garden", GardenSchema);
export default Garden;
