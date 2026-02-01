import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user'); // Also check user object just in case

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else if (user) {
    // Fallback if token is stored inside user object
    const parsedUser = JSON.parse(user);
    if (parsedUser?.token) {
        config.headers.Authorization = `Bearer ${parsedUser.token}`;
    }
  }

  return config;
});

export default api;
