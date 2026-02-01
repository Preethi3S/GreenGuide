import axios from 'axios';

const getAuthConfig = () => {
  const token = localStorage.getItem('token'); // Or use Redux state if stored there
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchReminders = async () => {
  const { data } = await axios.get('/api/reminders', getAuthConfig());
  return data;
};

export const createReminder = async (reminder) => {
  const { data } = await axios.post('/api/reminders', reminder, getAuthConfig());
  return data;
};

export const updateReminder = async (id, updatedFields) => {
  const { data } = await axios.put(`/api/reminders/${id}`, updatedFields, getAuthConfig());
  return data;
};

export const deleteReminder = async (id) => {
  const { data } = await axios.delete(`/api/reminders/${id}`, getAuthConfig());
  return data;
};
