import axios from 'axios';
const BASE_URL = '/api/growth';

export const addGrowthLog = async (plantId, logData, token) => {
  const { data } = await axios.post(`${BASE_URL}/${plantId}`, logData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const fetchGrowthLogs = async (plantId, token) => {
  const { data } = await axios.get(`${BASE_URL}/${plantId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const deleteGrowthLog = async (logId, token) => {
  const { data } = await axios.delete(`${BASE_URL}/log/${logId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const updateGrowthLog = async (logId, updatedData, token) => {
  const { data } = await axios.put(`${BASE_URL}/log/${logId}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
export const searchGrowthLogs = async (token, filters = {}) => {
  const query = new URLSearchParams(filters).toString();
  const { data } = await axios.get(`/api/growth?${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
export const fetchAllGrowthLogs = async (token, filters = {}) => {
  const params = new URLSearchParams();

  if (filters.plantId) params.append('plantId', filters.plantId);
  if (filters.healthStatus) params.append('healthStatus', filters.healthStatus);

  const { data } = await axios.get(`/api/growth?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};


