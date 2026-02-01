import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));
const token = user?.token;

// Get all notifications for logged-in user
export const getMyNotifications = () =>
  axios.get('/api/notifications', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// Mark a notification as read
export const markNotificationRead = (id) =>
  axios.patch(`/api/notifications/${id}/read`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Send a message to all admins
export const sendMessageToAdmin = ({ subject, body }) => {
  const userInfo = JSON.parse(localStorage.getItem('user'));

  if (!userInfo?.token) {
    throw new Error('Not logged in');
  }

  return axios.post(
    '/api/messages',
    { subject, body },
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  );
};

