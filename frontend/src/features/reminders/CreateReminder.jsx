import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createReminder } from './reminderAPI';

const CreateReminder = () => {
  const [title, setTitle] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [repeat, setRepeat] = useState('none');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createReminder({ title, scheduledAt, repeat });
      navigate('/reminders');
    } catch (err) {
      console.error(err);
      alert('Failed to create reminder');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light-bg p-6 font-sans flex items-center justify-center">
      <div className="w-full max-w-xl">
        <button
          onClick={() => navigate('/reminders')}
          className="mb-6 flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary transition-colors"
        >
          <span>←</span> Back to Reminders
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-secondary/10">
          <div className="flex items-center gap-3 mb-8">
            <span className="bg-primary/10 text-primary p-3 rounded-xl text-2xl">⏰</span>
            <h2 className="text-3xl font-serif font-bold text-secondary">Set Reminder</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary ml-1">Reminder Title</label>
              <input
                type="text"
                placeholder="e.g. Water the tomatoes"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary ml-1">Date & Time</label>
              <input
                type="datetime-local"
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
                required
                className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary ml-1">Repeat</label>
              <select
                value={repeat}
                onChange={(e) => setRepeat(e.target.value)}
                className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors appearance-none"
              >
                <option value="none">No Repeat</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full font-bold py-4 rounded-xl transition-colors shadow-lg shadow-secondary/20 mt-4 ${
                loading 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-secondary text-white hover:bg-primary'
              }`}
            >
              {loading ? 'Saving...' : 'Create Reminder'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateReminder;
