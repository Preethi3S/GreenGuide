// controllers/diseaseController.js
import asyncHandler from 'express-async-handler';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import { config } from '../config/env.js'; // ✅ Make sure this points to your env config

export const detectDisease = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }

  const filePath = req.file.path;
  console.log("[🔍] Sending image to AI service:", filePath);

  const form = new FormData();
  form.append('image', fs.createReadStream(filePath));

  try {
    const { data } = await axios.post(`${config.aiServiceUrl}/predict`, form, {
      headers: form.getHeaders(),
    });

    console.log('[✅] AI Response:', data);

    // ✅ Cleanup temp file after use
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    res.json(data); // { disease, advice }
  } catch (error) {
    console.error('❌ AI Service Error:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error(error.message);
    }

    // ✅ Cleanup temp file on error
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    res.status(500).json({ error: 'AI service failed to process the image' });
  }
});
