import axios from 'axios';

const BASE_URL = '/api/water';

// Fetch all water logs by current user
export const getWaterLogs = async (token) => {
  const { data } = await axios.get(`${BASE_URL}/all-logs`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// Add a new water log
export const addWaterLog = async (logData, token) => {
  const { data } = await axios.post(`${BASE_URL}/add`, logData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// Edit water log
export const editWaterLog = async (logId, updatedData, token) => {
  const { data } = await axios.put(`${BASE_URL}/${logId}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

// Delete water log
export const deleteWaterLog = async (logId, token) => {
  const { data } = await axios.delete(`${BASE_URL}/${logId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
