import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const GrowthLogPlantPicker = () => {
  const { token } = useSelector((state) => state.auth);
  const [plants, setPlants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlants = async () => {
      const { data } = await axios.get('/api/plants', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlants(data);
    };
    fetchPlants();
  }, [token]);

  return (
    <div className="min-h-screen bg-light-bg p-6 font-sans">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => window.history.back()}
          className="mb-6 flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary transition-colors"
        >
          <span>←</span> Back
        </button>

        <div className="bg-white rounded-3xl shadow-xl border border-secondary/10 p-8">
          <div className="flex items-center gap-3 mb-8">
            <span className="bg-primary/10 text-primary p-3 rounded-xl text-2xl">🌱</span>
            <h2 className="text-3xl font-serif font-bold text-secondary">Select a Plant</h2>
          </div>

          {plants.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No plants available. Add a plant first.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {plants.map((plant) => (
                <div
                  key={plant._id}
                  onClick={() => navigate(`/growth/${plant._id}/logs/add`)}
                  className="p-6 border border-secondary/10 rounded-2xl bg-light-bg cursor-pointer hover:shadow-md hover:border-primary/30 transition-all group flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-xl font-bold text-secondary group-hover:text-primary transition-colors">{plant.name}</h3>
                    <p className="text-gray-500">{plant.species || 'Unknown Species'}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-secondary group-hover:bg-primary group-hover:text-white transition-colors shadow-sm">
                    ➜
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GrowthLogPlantPicker;
