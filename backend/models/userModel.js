import mongoose from 'mongoose';

const loginEntrySchema = new mongoose.Schema({
  ip: String,
  device: String,
  time: { type: Date, default: Date.now }
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

 email: {
  type: String,
  unique: true,
  trim: true,
  lowercase: true,
  required: true,
  match: [/.+\@.+\..+/, 'Please enter a valid email address']
},

password: {
  type: String,
  required: true,
  minlength: [6, 'Password must be at least 6 characters'],
},

  avatar: String,

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },

  preferences: {
    plantTypes: [String], // (optional)
    notificationFrequency: { type: String, default: 'daily' },

    gardeningLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'expert'],
      default: 'beginner'
    },

    preferredPlants: {
      type: [String],
      default: []
    },

    gardenType: {
      type: String,
      enum: ['balcony', 'indoor', 'backyard', 'terrace', 'community'],
      default: 'indoor'
    }
  },

  loginHistory: [loginEntrySchema], // login metadata

  twoFactorEnabled: {
    type: Boolean,
    default: false,
  },

  isBanned: {
    type: Boolean,
    default: false,
  }

}, {
  timestamps: true,
});

export default mongoose.model('User', userSchema);
