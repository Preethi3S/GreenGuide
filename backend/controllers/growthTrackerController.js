import asyncHandler from 'express-async-handler';
import GrowthLog from '../models/growthLogModel.js';
import cloudinary from 'cloudinary';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const addGrowthLog = asyncHandler(async (req, res) => {
  const { height, leavesCount, photo, healthStatus, notes } = req.body;
  const plantId = req.params.plantId;

  let photoUrl = '';
  if (photo) {
    const uploaded = await cloudinary.v2.uploader.upload(photo, {
      folder: 'growthLogs',
    });
    photoUrl = uploaded.secure_url;
  }

  const log = await GrowthLog.create({
    user: req.user._id,
    plant: plantId,
    heightInCm: height,
    leavesCount,
    healthStatus,
    photoUrl,
    notes,
    date: new Date(),
  });

  res.status(201).json(log);
});

export const getGrowthLogs = asyncHandler(async (req, res) => {
  const logs = await GrowthLog.find({ plant: req.params.plantId }).sort({ date: 1 });
  res.json(logs);
});

export const deleteGrowthLog = asyncHandler(async (req, res) => {
  const log = await GrowthLog.findById(req.params.logId);
  if (!log) {
    res.status(404);
    throw new Error('Log not found');
  }
  if (log.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized');
  }
  await log.deleteOne();
  res.status(200).json({ message: 'Deleted successfully' });
});

export const updateGrowthLog = asyncHandler(async (req, res) => {
  const log = await GrowthLog.findById(req.params.logId);
  if (!log) {
    res.status(404);
    throw new Error('Log not found');
  }
  if (log.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized');
  }

  const { height, leavesCount, healthStatus, notes, photo } = req.body;

  let photoUrl = log.photoUrl;
  if (photo && photo !== log.photoUrl) {
    const uploaded = await cloudinary.v2.uploader.upload(photo, {
      folder: 'growthLogs',
    });
    photoUrl = uploaded.secure_url;
  }

  log.heightInCm = height;
  log.leavesCount = leavesCount;
  log.healthStatus = healthStatus;
  log.notes = notes;
  log.photoUrl = photoUrl;

  const updated = await log.save();
  res.json(updated);
});
export const searchGrowthLogs = asyncHandler(async (req, res) => {
  const { plantId, healthStatus, from, to } = req.query;

  const filters = { user: req.user._id };

  if (plantId) filters.plant = plantId;
  if (healthStatus) filters.healthStatus = healthStatus;
  if (from || to) {
    filters.date = {};
    if (from) filters.date.$gte = new Date(from);
    if (to) filters.date.$lte = new Date(to);
  }

  const logs = await GrowthLog.find(filters).sort({ date: -1 });
  res.json(logs);
});

export const getAllUserGrowthLogs = asyncHandler(async (req, res) => {
  const { plantId, healthStatus, search } = req.query;

  const query = {
    user: req.user._id,
  };

  if (plantId) {
    query.plant = plantId;
  }

  if (healthStatus) {
    query.healthStatus = { $regex: healthStatus, $options: 'i' }; // case-insensitive match
  }

  if (search) {
    query.$or = [
      { notes: { $regex: search, $options: 'i' } },
      { healthStatus: { $regex: search, $options: 'i' } },
    ];
  }

  const logs = await GrowthLog.find(query)
    .sort({ date: -1 })
    .populate('plant', 'name'); // get plant name only

  res.json(logs);
});
