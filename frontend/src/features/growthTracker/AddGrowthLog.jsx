import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addGrowthLog, updateGrowthLog } from './growthAPI';

const AddGrowthLog = () => {
  const { plantId, logId } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    date: '',
    height: '',
    notes: '',
    healthStatus: '',
  });

  const [loading, setLoading] = useState(false);

  // Load existing log data if editing
  useEffect(() => {
    if (logId) {
      const fetchLog = async () => {
        try {
          const res = await axios.get(`/api/growth/log/${logId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const log = res.data;
          setFormData({
            date: log.date?.substring(0, 10),
            height: log.height,
            notes: log.notes,
            healthStatus: log.healthStatus,
          });
        } catch (error) {
          toast.error('Failed to load growth log');
        }
      };
      fetchLog();
    }
  }, [logId, token]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (logId) {
        await updateGrowthLog(logId, formData, token);
        toast.success('Growth log updated!');
      } else {
        await addGrowthLog(plantId, formData, token);
        toast.success('Growth log added!');
      }
      navigate(`/growth/${plantId}/logs`);
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light-bg p-6 font-sans flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary transition-colors"
        >
          <span>←</span> Back
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-secondary/10">
          <div className="flex items-center gap-3 mb-8">
            <span className="bg-primary/10 text-primary p-3 rounded-xl text-2xl">📈</span>
            <h2 className="text-3xl font-serif font-bold text-secondary">
              {logId ? 'Edit Growth Log' : 'Add Growth Log'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary ml-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary ml-1">Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  required
                  className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary ml-1">Health Status</label>
              <select
                name="healthStatus"
                value={formData.healthStatus}
                onChange={handleChange}
                required
                className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors appearance-none"
              >
                <option value="">Select Status</option>
                <option value="Healthy">Healthy</option>
                <option value="Moderate">Moderate</option>
                <option value="Unhealthy">Unhealthy</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary ml-1">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
                rows="4"
                placeholder="Observations about growth..."
              />
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
              {loading ? 'Saving...' : logId ? 'Update Log' : 'Add Log'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddGrowthLog;
