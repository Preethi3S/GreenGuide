import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllGrowthLogs } from './growthAPI';

import { deleteGrowthLog } from './growthAPI';
const GrowthLogs = () => {
  const { token } = useSelector((state) => state.auth);
  const [logs, setLogs] = useState([]);
  const [plants, setPlants] = useState([]);
  const [filter, setFilter] = useState({ plantId: '', healthStatus: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlants = async () => {
      const { data } = await axios.get('/api/plants', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlants(data);
    };
    fetchPlants();
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    const data = await fetchAllGrowthLogs(token, filter);
    setLogs(data);
  };

  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    fetchLogs();
  };

  const handleDelete = async (logId) => {
  if (!window.confirm('Are you sure you want to delete this log?')) return;

  try {
    await deleteGrowthLog(logId, token);
    toast.success('Log deleted!');
    setLogs(logs.filter(log => log._id !== logId));
  } catch (error) {
    toast.error('Failed to delete log');
  }
};

  return (
    <div className="min-h-screen bg-light-bg p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h2 className="text-4xl font-serif font-bold text-secondary mb-2">Growth Tracker</h2>
            <p className="text-gray-600">Monitor the progress of your plants</p>
          </div>
          <button
            onClick={() => navigate('/growth/add')}
            className="bg-secondary text-white px-8 py-3 rounded-full font-bold hover:bg-primary transition-colors shadow-lg shadow-secondary/20 flex items-center gap-2"
          >
            <span>📈</span> Add Growth Log
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4 mb-10 border border-secondary/10 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full">
            <select
              name="plantId"
              value={filter.plantId}
              onChange={handleChange}
              className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors appearance-none"
            >
              <option value="">All Plants</option>
              {plants.map((plant) => (
                <option key={plant._id} value={plant._id}>
                  {plant.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 w-full">
            <select
              name="healthStatus"
              value={filter.healthStatus}
              onChange={handleChange}
              className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors appearance-none"
            >
              <option value="">All Health Status</option>
              <option value="Healthy">Healthy</option>
              <option value="Stunted">Stunted</option>
              <option value="Diseased">Diseased</option>
            </select>
          </div>

          <button
            onClick={handleSearch}
            className="w-full md:w-auto bg-secondary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary transition-colors"
          >
            Filter Logs
          </button>
        </div>

        {logs.length === 0 ? (
          <div className="text-center py-20 opacity-50">
            <span className="text-6xl block mb-4">📉</span>
            <p className="text-xl font-bold text-secondary">No growth logs found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {logs.map((log) => (
              <div key={log._id} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-secondary/10 hover:shadow-2xl transition-all group">
                <div className="relative h-48 bg-gray-100">
                  {log.photoUrl ? (
                    <img
                      src={log.photoUrl}
                      alt="Log"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">🌱</div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
                      log.healthStatus === 'Healthy' ? 'bg-green-100 text-green-800' :
                      log.healthStatus === 'Stunted' ? 'bg-yellow-100 text-yellow-800' :
                      log.healthStatus === 'Diseased' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {log.healthStatus || 'Unknown'}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-serif font-bold text-xl text-secondary mb-1">{log.plant?.name || 'Unknown Plant'}</h3>
                      <p className="text-sm text-gray-500">{new Date(log.date).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-light-bg p-3 rounded-xl text-center">
                      <span className="block text-xs font-bold text-gray-400 uppercase">Height</span>
                      <span className="font-bold text-secondary text-lg">{log.heightInCm} cm</span>
                    </div>
                    <div className="bg-light-bg p-3 rounded-xl text-center">
                      <span className="block text-xs font-bold text-gray-400 uppercase">Leaves</span>
                      <span className="font-bold text-secondary text-lg">{log.leavesCount || '-'}</span>
                    </div>
                  </div>

                  {log.notes && (
                    <p className="text-gray-600 text-sm italic mb-6 line-clamp-2">"{log.notes}"</p>
                  )}

                  <div className="flex gap-3 pt-4 border-t border-gray-100">
                    <button 
                      onClick={() => navigate(`/growth/${log.plant._id}/logs/edit/${log._id}`, { state: log })}
                      className="flex-1 py-2 rounded-lg font-bold text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(log._id)}
                      className="flex-1 py-2 rounded-lg font-bold text-sm text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GrowthLogs;
