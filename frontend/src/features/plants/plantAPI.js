import axios from 'axios';

const BASE_URL = '/api/plants';

// 🔍 Get logged-in user's plants
export const fetchMyPlants = async (token) => {
  const { data } = await axios.get(`${BASE_URL}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// 🌱 Add a new plant (with optional image)
export const addNewPlant = async (plantData, token) => {
  const { data } = await axios.post(BASE_URL, plantData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data', // Must be inside headers
    },
  });
  return data;
};

// 🛠️ Update existing plant (correct endpoint: /plants/:id)
export const updatePlant = async (id, plantData, token) => {
  const { data } = await axios.put(`${BASE_URL}/${id}`, plantData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data', // Axios will set boundary
    },
  });
  return data;
};

// 🗑️ Delete a plant
export const deletePlant = async (id, token) => {
  const { data } = await axios.delete(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
