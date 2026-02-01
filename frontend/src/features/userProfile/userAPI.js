import axios from 'axios';

const BASE_URL = '/api/users';

export const getUserProfile = async (token) => {
  const { data } = await axios.get(`${BASE_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const updateUserProfile = async (token, userData) => {
  const { data } = await axios.put(`${BASE_URL}/profile`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const changePassword = async (token, passwords) => {
  const { data } = await axios.patch(`${BASE_URL}/change-password`, passwords, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
