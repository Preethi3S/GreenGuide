import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteReminder, fetchReminders } from './reminderAPI';

const ReminderList = () => {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadReminders = async () => {
    try {
      const data = await fetchReminders();
      setReminders(data);
    } catch (err) {
      console.error('Failed to load reminders', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this reminder?')) return;
    try {
      await deleteReminder(id);
      setReminders(reminders.filter((r) => r._id !== id));
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  useEffect(() => {
    loadReminders();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-light-bg flex items-center justify-center">
      <div className="animate-spin text-4xl">⏳</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-light-bg p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h2 className="text-4xl font-serif font-bold text-secondary mb-2">Reminders</h2>
            <p className="text-gray-600">Never miss a watering or care task</p>
          </div>
          <Link
            to="/reminders/create"
            className="bg-secondary text-white px-8 py-3 rounded-full font-bold hover:bg-primary transition-colors shadow-lg shadow-secondary/20 flex items-center gap-2"
          >
            <span>⏰</span> New Reminder
          </Link>
        </div>

        {reminders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-xl border border-secondary/10">
            <span className="text-6xl block mb-6 opacity-50">🔔</span>
            <h3 className="text-2xl font-bold text-secondary mb-2">No reminders set</h3>
            <p className="text-gray-500 mb-8">You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reminders.map((reminder) => (
              <div key={reminder._id} className="bg-white p-6 rounded-2xl shadow-sm border border-secondary/5 flex flex-col sm:flex-row justify-between items-center gap-4 hover:shadow-md transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl">
                    📅
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-secondary">{reminder.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1">
                        🕒 {new Date(reminder.scheduledAt).toLocaleString()}
                      </span>
                      {reminder.repeat && (
                        <span className="bg-gray-100 px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wide">
                          {reminder.repeat}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => handleDelete(reminder._id)}
                  className="text-red-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                  title="Delete Reminder"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReminderList;
