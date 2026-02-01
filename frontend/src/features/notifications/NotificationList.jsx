import { useEffect, useState } from 'react';
import { getMyNotifications, markNotificationRead } from './notificationAPI';

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const { data } = await getMyNotifications();
      setNotifications(data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) return (
    <div className="flex justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-light-bg p-6 font-sans">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl border border-secondary/10 p-8">
          <div className="flex items-center gap-3 mb-8">
            <span className="bg-primary/10 text-primary p-3 rounded-xl text-2xl">🔔</span>
            <h2 className="text-3xl font-serif font-bold text-secondary">Notifications</h2>
          </div>

          {notifications.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>You have no notifications.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {notifications.map((note) => (
                <li
                  key={note._id}
                  className={`p-5 rounded-2xl transition-all ${
                    note.read 
                      ? 'bg-light-bg border border-secondary/10' 
                      : 'bg-white border-l-4 border-primary shadow-md'
                  }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h4 className={`text-lg font-bold mb-1 ${note.read ? 'text-gray-700' : 'text-secondary'}`}>
                        {note.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed mb-2">{note.body}</p>

                      {note.plant?.name && (
                        <div className="inline-flex items-center gap-1 text-sm font-bold text-green-700 bg-green-50 px-2 py-1 rounded-lg">
                          <span>🌱</span>
                          <span>{note.plant.name}</span>
                        </div>
                      )}
                    </div>

                    {!note.read && (
                      <button
                        onClick={() => handleMarkAsRead(note._id)}
                        className="text-sm font-bold text-primary hover:text-primary/80 whitespace-nowrap bg-primary/5 px-3 py-1 rounded-lg hover:bg-primary/10 transition-colors"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-gray-400 mt-3 font-medium">
                    {new Date(note.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationList;
