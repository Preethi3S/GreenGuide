import axios from 'axios';

const BASE_URL = '/api/admin';
const token = localStorage.getItem('token');

const headers = {
  Authorization: `Bearer ${token}`,
};

export const getAllUsers = async () => {
  const { data } = await axios.get(`${BASE_URL}/users`, { headers });
  return data;
};

export const banUserById = async (id) => {
  const { data } = await axios.patch(`${BASE_URL}/users/${id}/ban`, {}, { headers });
  return data;
};

export const getSystemStats = async () => {
  const { data } = await axios.get(`${BASE_URL}/stats`, { headers });
  return data;
};
