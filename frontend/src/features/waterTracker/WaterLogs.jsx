import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteWaterLog, editWaterLog, getWaterLogs } from './waterAPI';

const WaterLogs = () => {
  const { token } = useSelector((state) => state.auth);
  const [plants, setPlants] = useState([]);
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState('');
  const [editingLogId, setEditingLogId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: plantList } = await axios.get('/api/plants', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlants(plantList);

        const logData = await getWaterLogs(token);
        setLogs(logData);
      } catch (error) {
        console.error('Error loading logs or plants:', error);
      }
    };

    fetchData();
  }, [token, location.search]);

  // Prevent crash if log.plant is null or undefined
  const logsByPlant = logs.reduce((acc, log) => {
    const plantId =
      typeof log.plant === 'string'
        ? log.plant
        : log.plant?._id || 'unknown';

    if (!acc[plantId]) acc[plantId] = [];
    acc[plantId].push(log);
    return acc;
  }, {});

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEditChange = (field, value) => {
    setEditForm({ ...editForm, [field]: value });
  };

  const handleEditSubmit = async (logId) => {
    try {
      const updated = await editWaterLog(logId, editForm, token);
      setLogs((prev) =>
        prev.map((log) => (log._id === logId ? updated : log))
      );
      toast.success('Water log updated');
      setEditingLogId(null);
      setEditForm({});
    } catch (err) {
      toast.error('Update failed');
    }
  };

  const handleDelete = async (logId) => {
    if (!window.confirm('Are you sure you want to delete this log?')) return;
    try {
      await deleteWaterLog(logId, token);
      setLogs((prev) => prev.filter((log) => log._id !== logId));
      toast.success('Water log deleted');
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="min-h-screen bg-light-bg p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h2 className="text-4xl font-serif font-bold text-secondary mb-2">Water Tracker</h2>
            <p className="text-gray-600">Keep track of your watering schedule</p>
          </div>
          <button
            onClick={() => navigate('/water/add')}
            className="bg-secondary text-white px-8 py-3 rounded-full font-bold hover:bg-primary transition-colors shadow-lg shadow-secondary/20 flex items-center gap-2"
          >
            <span>💧</span> Add Water Log
          </button>
        </div>

        <div className="relative mb-10">
          <input
            type="text"
            placeholder="Search by plant name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-secondary/10 rounded-2xl px-6 py-4 pl-12 focus:outline-none focus:border-primary transition-colors shadow-sm"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">🔍</span>
        </div>

        {filteredPlants.length === 0 ? (
           <div className="text-center py-20 opacity-50">
              <span className="text-6xl block mb-4">🌿</span>
              <p className="text-xl font-bold text-secondary">No plants found</p>
           </div>
        ) : (
           <div className="space-y-8">
             {filteredPlants.map((plant) => (
               <div key={plant._id} className="bg-white rounded-3xl shadow-xl p-8 border border-secondary/10">
                 <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                   <span className="bg-primary/10 text-primary p-2 rounded-lg text-xl">🌱</span>
                   <h3 className="text-2xl font-serif font-bold text-secondary">
                     {plant.name}
                   </h3>
                 </div>

                 {logsByPlant[plant._id]?.length > 0 ? (
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {logsByPlant[plant._id].map((log) => (
                       <div
                         key={log._id}
                         className="bg-light-bg p-6 rounded-2xl border border-secondary/5 hover:border-primary/30 transition-all group"
                       >
                         {editingLogId === log._id ? (
                           <div className="space-y-4">
                             <div className="space-y-1">
                               <label className="text-xs font-bold text-secondary uppercase">Amount (ml)</label>
                               <input
                                 type="number"
                                 value={editForm.amount}
                                 onChange={(e) => handleEditChange('amount', e.target.value)}
                                 className="w-full bg-white border border-secondary/20 rounded-xl px-3 py-2 focus:outline-none focus:border-primary"
                                 placeholder="Amount"
                               />
                             </div>
                             <div className="space-y-1">
                               <label className="text-xs font-bold text-secondary uppercase">Method</label>
                               <input
                                 type="text"
                                 value={editForm.method}
                                 onChange={(e) => handleEditChange('method', e.target.value)}
                                 className="w-full bg-white border border-secondary/20 rounded-xl px-3 py-2 focus:outline-none focus:border-primary"
                                 placeholder="Method"
                               />
                             </div>
                             <div className="space-y-1">
                               <label className="text-xs font-bold text-secondary uppercase">Notes</label>
                               <textarea
                                 value={editForm.notes}
                                 onChange={(e) => handleEditChange('notes', e.target.value)}
                                 className="w-full bg-white border border-secondary/20 rounded-xl px-3 py-2 focus:outline-none focus:border-primary resize-none"
                                 placeholder="Notes"
                                 rows="2"
                               />
                             </div>
                             <div className="flex gap-2 pt-2">
                               <button
                                 onClick={() => handleEditSubmit(log._id)}
                                 className="flex-1 bg-secondary text-white py-2 rounded-lg font-bold text-sm hover:bg-primary transition-colors"
                               >
                                 Save
                               </button>
                               <button
                                 onClick={() => {
                                   setEditingLogId(null);
                                   setEditForm({});
                                 }}
                                 className="flex-1 bg-gray-200 text-gray-600 py-2 rounded-lg font-bold text-sm hover:bg-gray-300 transition-colors"
                               >
                                 Cancel
                               </button>
                             </div>
                           </div>
                         ) : (
                           <>
                             <div className="flex justify-between items-start mb-4">
                               <div>
                                 <span className="block font-bold text-lg text-secondary">
                                   {log.wateredAt && !isNaN(new Date(log.wateredAt))
                                     ? new Date(log.wateredAt).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })
                                     : 'Unknown Date'}
                                 </span>
                                 <span className="text-sm text-primary font-bold bg-primary/5 px-2 py-1 rounded-md inline-block mt-1">
                                   {log.amount} ml
                                 </span>
                               </div>
                               <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                 <button
                                   onClick={() => {
                                     setEditingLogId(log._id);
                                     setEditForm({
                                       amount: log.amount,
                                       method: log.method || '',
                                       notes: log.notes || '',
                                     });
                                   }}
                                   className="p-2 bg-white rounded-full shadow-sm text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                                   title="Edit"
                                 >
                                   ✏️
                                 </button>
                                 <button
                                   onClick={() => handleDelete(log._id)}
                                   className="p-2 bg-white rounded-full shadow-sm text-red-500 hover:text-red-700 hover:bg-red-50"
                                   title="Delete"
                                 >
                                   🗑️
                                 </button>
                               </div>
                             </div>
                             
                             <div className="space-y-2 text-sm text-gray-600">
                               {log.method && (
                                 <div className="flex items-center gap-2">
                                   <span className="text-secondary">🚿</span>
                                   <span>{log.method}</span>
                                 </div>
                               )}
                               {log.notes && (
                                 <div className="flex items-start gap-2 bg-white p-3 rounded-xl border border-secondary/5 italic">
                                   <span className="text-secondary mt-1">📝</span>
                                   <span>{log.notes}</span>
                                 </div>
                               )}
                             </div>
                           </>
                         )}
                       </div>
                     ))}
                   </div>
                 ) : (
                   <div className="text-center py-8 bg-light-bg rounded-2xl border border-dashed border-secondary/20">
                     <p className="text-gray-500 italic">No water logs recorded yet.</p>
                     <button 
                        onClick={() => navigate('/water/add')}
                        className="mt-4 text-primary font-bold hover:underline text-sm"
                     >
                        Add First Log
                     </button>
                   </div>
                 )}
               </div>
             ))}
           </div>
        )}

        {/* Handle logs with no matching plant */}
        {logsByPlant['unknown']?.length > 0 && (
          <div className="mt-10 bg-red-50 rounded-3xl shadow-xl p-8 border border-red-100">
            <h3 className="text-2xl font-serif font-bold text-red-800 mb-6 flex items-center gap-2">
              <span>⚠️</span> Unassigned Logs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {logsByPlant['unknown'].map((log) => (
                <div key={log._id} className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm">
                  <div className="flex justify-between">
                    <span className="font-bold text-red-800">
                      {log.wateredAt
                        ? new Date(log.wateredAt).toLocaleDateString()
                        : 'Unknown Date'}
                    </span>
                    <span className="text-sm text-red-600 font-bold">
                      {log.amount} ml
                    </span>
                  </div>
                  {log.notes && (
                    <p className="mt-2 text-gray-600 italic text-sm">{log.notes}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaterLogs;
