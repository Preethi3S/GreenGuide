import asyncHandler from 'express-async-handler';
import Reminder from '../models/reminderModel.js';

export const createReminder = asyncHandler(async (req, res) => {
  const { plant, title, scheduledAt, repeat } = req.body;

  const reminder = await Reminder.create({
    user: req.user._id,
    plant,
    title,
    scheduledAt,
    repeat,
  });

  res.status(201).json(reminder);
});

export const getReminders = asyncHandler(async (req, res) => {
  const reminders = await Reminder.find({ user: req.user._id }).sort({ scheduledAt: 1 });
  res.json(reminders);
});

export const updateReminder = asyncHandler(async (req, res) => {
  const { title, scheduledAt, repeat } = req.body;
  const reminder = await Reminder.findById(req.params.id);

  if (!reminder) {
    res.status(404);
    throw new Error('Reminder not found');
  }

  if (reminder.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized');
  }

  reminder.title = title || reminder.title;
  reminder.scheduledAt = scheduledAt || reminder.scheduledAt;
  reminder.repeat = repeat || reminder.repeat;

  const updated = await reminder.save();
  res.json(updated);
});

export const deleteReminder = asyncHandler(async (req, res) => {
  const reminder = await Reminder.findById(req.params.id);

  if (!reminder) {
    res.status(404);
    throw new Error('Reminder not found');
  }

  if (reminder.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized');
  }

  await reminder.deleteOne();
  res.json({ message: 'Reminder deleted successfully' });
});
