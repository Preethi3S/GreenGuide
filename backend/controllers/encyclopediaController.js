import Encyclopedia from '../models/encyclopediaModel.js';
import cloudinary from 'cloudinary';
import fs from 'fs';

// ⛅ Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET /api/encyclopedia
export const getAllEncyclopediaPlants = async (req, res) => {
  try {
    const plants = await Encyclopedia.find().sort({ createdAt: -1 });
    res.status(200).json(plants);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch encyclopedia entries' });
  }
};

// GET /api/encyclopedia/:id
export const getEncyclopediaPlantById = async (req, res) => {
  try {
    const plant = await Encyclopedia.findById(req.params.id);
    if (!plant) return res.status(404).json({ error: 'Plant not found' });
    res.status(200).json(plant);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the plant' });
  }
};

// POST /api/encyclopedia (admin only)
export const createEncyclopediaPlant = async (req, res) => {
  try {
    const {
      name,
      species,
      description,
      soilType,
      season,
      yield: yieldValue,
    } = req.body;

    let imageUrl = '';
    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'greenguide/encyclopedia',
      });
      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path); // remove temp file
    }

    const newPlant = new Encyclopedia({
      name,
      species,
      description,
      soilType,
      season,
      yield: yieldValue,
      imageUrl,
    });

    await newPlant.save();
    res.status(201).json(newPlant);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create entry' });
  }
};

// PUT /api/encyclopedia/:id (admin only)
export const updateEncyclopediaPlant = async (req, res) => {
  try {
    const {
      name,
      species,
      description,
      soilType,
      season,
      yield: yieldValue,
    } = req.body;

    const plant = await Encyclopedia.findById(req.params.id);
    if (!plant) return res.status(404).json({ error: 'Plant not found' });

    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'greenguide/encyclopedia',
      });
      plant.imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path); // remove temp file
    }

    // Update other fields
    plant.name = name || plant.name;
    plant.species = species || plant.species;
    plant.description = description || plant.description;
    plant.soilType = soilType || plant.soilType;
    plant.season = season || plant.season;
    plant.yield = yieldValue || plant.yield;

    const updated = await plant.save();
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update entry' });
  }
};

// DELETE /api/encyclopedia/:id (admin only)
export const deleteEncyclopediaPlant = async (req, res) => {
  try {
    const plant = await Encyclopedia.findByIdAndDelete(req.params.id);
    if (!plant) return res.status(404).json({ error: 'Plant not found' });

    res.status(200).json({ message: 'Plant deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete entry' });
  }
};
