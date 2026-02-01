import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editWaterLog } from './waterAPI.js';

const EditWaterLogForm = () => {
  const { token } = useSelector((state) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();

  const [log, setLog] = useState(null);
  const [form, setForm] = useState({ amount: '', method: '', notes: '' });

  useEffect(() => {
    
    const fetchLog = async () => {
      try {
        const { data } = await axios.get(`/api/water/all-logs`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const found = data.find((l) => l._id === id);
        if (found) {
          setLog(found);
          setForm({
            amount: found.amount,
            method: found.method || '',
            notes: found.notes || '',
          });
        }
      } catch (err) {
        toast.error('Error loading log');
      }
    };
    fetchLog();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editWaterLog(id, form, token);
      toast.success('Water log updated!');
      navigate('/water?refresh=true');
    } catch {
      toast.error('Failed to update');
    }
  };

  if (!log) return (
    <div className="min-h-screen bg-light-bg flex items-center justify-center">
      <div className="animate-spin text-4xl">⏳</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-light-bg p-6 font-sans flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <button
          onClick={() => navigate('/water')}
          className="mb-6 flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary transition-colors"
        >
          <span>←</span> Back to Water Logs
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-secondary/10">
          <div className="flex items-center gap-3 mb-8">
            <span className="bg-primary/10 text-primary p-3 rounded-xl text-2xl">✏️</span>
            <h2 className="text-3xl font-serif font-bold text-secondary">Edit Water Log</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary ml-1">Amount (ml)</label>
                <input
                  type="number"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Amount in ml"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary ml-1">Method</label>
                <input
                  type="text"
                  value={form.method}
                  onChange={(e) => setForm({ ...form, method: e.target.value })}
                  className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Method"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary ml-1">Notes</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="Notes"
                rows="4"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-secondary text-white font-bold py-4 rounded-xl hover:bg-primary transition-colors shadow-lg shadow-secondary/20 mt-4"
            >
              Update Log
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditWaterLogForm;
