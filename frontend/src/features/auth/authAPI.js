import api from '../../utils/api';

const BASE_URL = '/auth';

export const login = async (credentials) => {
  const response = await api.post(`${BASE_URL}/login`, credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post(`${BASE_URL}/register`, userData);
  return response.data;
};

export const getMe = async (token) => {
  // Token is attached automatically by interceptor if saved in localStorage
  const response = await api.get(`${BASE_URL}/me`);
  return response.data;
};
