import axios from 'axios';

const BASE_URL = '/api/encyclopedia';

// Get all encyclopedia plants
export const getEncyclopediaPlants = async () => {
  const { data } = await axios.get(`${BASE_URL}/`);
  return data;
};

// Add a new encyclopedia plant
export const addEncyclopediaPlant = async (formData, token) => {
  const { data } = await axios.post(BASE_URL, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

// Update a plant
export const updateEncyclopediaPlant = async (id, formData, token) => {
  const { data } = await axios.put(`${BASE_URL}/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

// Delete a plant
export const deleteEncyclopediaPlant = async (id, token) => {
  const { data } = await axios.delete(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// Get a single encyclopedia plant by ID
export const fetchEncyclopediaDetail = async (id) => {
  const { data } = await axios.get(`/api/encyclopedia/${id}`);
  return data;
};
