// backend/controllers/waterController.js
import mongoose from 'mongoose';

import asyncHandler from 'express-async-handler';
import WaterLog from '../models/waterLogModel.js';

// @desc Add new water log
// @route POST /api/water/add
export const addWaterLog = asyncHandler(async (req, res) => {
  console.log('User in request:', req.user);
  const { plantId, amount, method, notes } = req.body;

  if (!mongoose.Types.ObjectId.isValid(plantId)) {
  return res.status(400).json({ message: 'Invalid plant ID' });
}

  if (!plantId || !amount) {
    res.status(400);
    throw new Error('Plant ID and amount are required');
  }

  const log = await WaterLog.create({
    user: req.user._id,
    plant: plantId,
    amount,
    method,
    notes,
    wateredAt: new Date(),
  });

  res.status(201).json(log);
});

// @desc Get ALL water logs by user
// @route GET /api/water/all-logs
export const getAllWaterLogs = asyncHandler(async (req, res) => {
  const logs = await WaterLog.find({ user: req.user._id })
    .populate('plant', 'name')
    .sort({ date: -1 });

  res.json(logs);
});

// @desc Edit a water log
// @route PUT /api/water/:id
export const updateWaterLog = asyncHandler(async (req, res) => {
  const log = await WaterLog.findById(req.params.id);
  if (!log) {
    res.status(404);
    throw new Error('Water log not found');
  }
  if (log.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const { amount, method, notes } = req.body;
  log.amount = amount ?? log.amount;
  log.method = method ?? log.method;
  log.notes = notes ?? log.notes;

  const updatedLog = await log.save();
  res.json(updatedLog);
});

// @desc Delete a water log
// @route DELETE /api/water/:id
export const deleteWaterLog = asyncHandler(async (req, res) => {
  const log = await WaterLog.findById(req.params.id);
  if (!log) {
    res.status(404);
    throw new Error('Water log not found');
  }
  if (log.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await log.deleteOne();
  res.json({ message: 'Water log deleted successfully' });
});
