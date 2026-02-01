import asyncHandler from 'express-async-handler';
import Plant from '../models/plantModel.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Cloudinary config (inbound style)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// =========================
// 🌱 PLANT CONTROLLERS
// =========================

// @desc    Get all plants owned by the current user
// @route   GET /api/plants
// @access  Private
export const getUserPlants = asyncHandler(async (req, res) => {
  const plants = await Plant.find({ owner: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json(plants);
});

// @desc    Add a new plant
// @route   POST /api/plants
// @access  Private
export const addPlant = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      species,
      description,
      waterSchedule,
      plantedDate,
      sunlightRequirement,
      soilType,
      healthStatus,
      growthStage,
      tags,
      location,
      idealTemperature,
      isPublic
    } = req.body;

    console.log('Incoming Plant Body:', req.body);

    if (!name || !species) {
      res.status(400);
      throw new Error('Name and species are required');
    }

    let imageUrl = '';
    if (req.file) {
      console.log("Uploading to Cloudinary...");
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'greenguide/plants',
      });
      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path); // delete temp local file
      console.log("Upload Success:", imageUrl);
    }

    const newPlant = new Plant({
      owner: req.user._id,
      name,
      species,
      description,
      imageUrl,
      waterSchedule,
      plantedDate,
      sunlightRequirement,
      soilType,
      healthStatus,
      growthStage,
      tags,
      location,
      idealTemperature,
      isPublic: isPublic || false,
    });

    const saved = await newPlant.save();
    console.log("Saved Plant:", saved);

    res.status(201).json(saved);
  } catch (error) {
    console.error('❌ Error in addPlant:', error.message);
    res.status(500).json({ message: error.message });
  }
});


// @desc    Edit a plant
// @route   PUT /api/plants/:id
// @access  Private
export const updatePlant = asyncHandler(async (req, res) => {
  const plant = await Plant.findById(req.params.id);
  if (!plant) throw new Error('Plant not found');

  if (plant.owner.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this plant');
  }

  console.log("👉 Incoming request to add plant");
  console.log("Headers:", req.headers);
  console.log("User:", req.user);

  const {
    name,
    species,
    description,
    waterSchedule,
    plantedDate,
    sunlightRequirement,
    soilType,
    healthStatus,
    growthStage,
    tags,
    location,
    idealTemperature,
    isPublic
  } = req.body;

  plant.name = name || plant.name;
  plant.species = species || plant.species;
  plant.description = description || plant.description;
  plant.waterSchedule = waterSchedule || plant.waterSchedule;
  plant.plantedDate = plantedDate || plant.plantedDate;
  plant.sunlightRequirement = sunlightRequirement || plant.sunlightRequirement;
  plant.soilType = soilType || plant.soilType;
  plant.healthStatus = healthStatus || plant.healthStatus;
  plant.growthStage = growthStage || plant.growthStage;
  plant.tags = tags || plant.tags;
  plant.location = location || plant.location;
  plant.idealTemperature = idealTemperature || plant.idealTemperature;
  plant.isPublic = typeof isPublic === 'boolean' ? isPublic : plant.isPublic;

  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'greenguide/plants',
    });
    plant.imageUrl = result.secure_url;
    fs.unlinkSync(req.file.path); // delete temp local file
  }

  const updated = await plant.save();
  res.status(200).json(updated);
});

// @desc    Delete a plant
// @route   DELETE /api/plants/:id
// @access  Private
export const deletePlant = asyncHandler(async (req, res) => {
  const plant = await Plant.findById(req.params.id);
  if (!plant) throw new Error('Plant not found');

  if (plant.owner.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this plant');
  }

  await plant.deleteOne();
  res.json({ message: 'Plant deleted successfully' });
});
