import mongoose from 'mongoose';

const waterLogSchema = new mongoose.Schema(
  {
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
    amount: {
      type: Number,
      required: true,
    },
    method: {
  type: String,
  default: 'Other',
},

    notes: {
      type: String,
    },
    wateredAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const WaterLog = mongoose.model('WaterLog', waterLogSchema);

export default WaterLog;
