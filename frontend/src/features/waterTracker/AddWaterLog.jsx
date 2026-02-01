import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const AddWaterLog = () => {
  const { token } = useSelector((state) => state.auth);
  const [plants, setPlants] = useState([]);
  const [selectedPlantId, setSelectedPlantId] = useState('');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('');
  const [notes, setNotes] = useState('');

  // Load user's plants on component mount
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const { data } = await axios.get('/api/plants', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlants(data);
      } catch (err) {
        console.error('Failed to load plants:', err);
        toast.error('Could not load plants');
      }
    };
    if (token) fetchPlants();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPlantId || !amount) {
      toast.error('Plant and amount are required');
      return;
    }

    try {
      await axios.post(
        '/api/water/add',
        {
          plantId: selectedPlantId,
          amount,
          method,
          notes,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success('Water log added!');
      // Reset form after successful submit
      setSelectedPlantId('');
      setAmount('');
      setMethod('');
      setNotes('');
    } catch (err) {
      console.error('Error adding water log:', err);
      toast.error('Failed to add water log');
    }
  };

  return (
    <div className="min-h-screen bg-light-bg p-6 font-sans flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <button
          onClick={() => window.history.back()}
          className="mb-6 flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary transition-colors"
        >
          <span>←</span> Back to Water Logs
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-secondary/10">
          <div className="flex items-center gap-3 mb-8">
            <span className="bg-primary/10 text-primary p-3 rounded-xl text-2xl">💧</span>
            <h2 className="text-3xl font-serif font-bold text-secondary">Add Water Log</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary ml-1">Select Plant</label>
              <select
                value={selectedPlantId}
                onChange={(e) => setSelectedPlantId(e.target.value)}
                className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors appearance-none"
                required
              >
                <option value="" disabled>Choose a plant...</option>
                {plants.map((plant) => (
                  <option key={plant._id} value={plant._id}>
                    {plant.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary ml-1">Amount (ml)</label>
                <input
                  type="number"
                  placeholder="e.g. 500"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  required
                  min="1"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary ml-1">Method (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Spray, Drip"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary ml-1">Notes (Optional)</label>
              <textarea
                placeholder="Any observations..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
                rows={4}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-secondary text-white font-bold py-4 rounded-xl hover:bg-primary transition-colors shadow-lg shadow-secondary/20 mt-4"
            >
              Save Water Log
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddWaterLog;
