import Garden from "../models/gardenModel.js";

export const createGarden = async (req, res) => {
  try {
    const newGarden = await Garden.create({ ...req.body, user: req.user._id });
    res.status(201).json(newGarden);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserGarden = async (req, res) => {
  try {
    const garden = await Garden.findOne({ user: req.user._id });
    if (!garden) return res.status(404).json({ message: "No garden found" });
    res.json(garden);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateGardenLayout = async (req, res) => {
  try {
    const garden = await Garden.findOneAndUpdate(
      { user: req.user._id },
      { layout: req.body.layout },
      { new: true }
    );
    res.json(garden);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
