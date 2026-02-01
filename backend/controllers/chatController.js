import asyncHandler from 'express-async-handler';
import axios from 'axios';

export const chatWithGardeningBot = asyncHandler(async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).json({ error: 'Message is required' });

  const prompt = `Answer only gardening questions about plant care, soil, watering, pests, and fertilizers. If not gardening, say: "I help with gardening only 🌿".\nUser: ${message}\nGreenBot:`;

  try {
    const response = await axios.post(
      'https://api.cohere.ai/v1/generate',
      {
        model: 'command-r-plus',
        prompt,
        max_tokens: 100,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const reply = response.data.generations[0]?.text.trim();
    if (!reply) return res.status(500).json({ error: 'No reply generated' });

    res.json({ reply });
  } catch (error) {
    console.error('Cohere Error:', error.message);
    res.status(500).json({ error: 'AI processing failed' });
  }
});
