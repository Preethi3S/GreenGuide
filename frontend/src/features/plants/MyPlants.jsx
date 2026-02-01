import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deletePlant, fetchMyPlants } from './plantAPI.js';

const MyPlants = () => {
  const { token } = useSelector((state) => state.auth);
  const [plants, setPlants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPlants = async () => {
      const data = await fetchMyPlants(token);
      setPlants(data);
    };
    loadPlants();
  }, [token]);

  const handleDelete = async (id) => {
    await deletePlant(id, token);
    setPlants(plants.filter((p) => p._id !== id));
  };

  return (
    <div className="p-6 min-h-screen bg-light-bg font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-secondary/10 pb-6">
          <div>
             <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Your Garden</span>
             <h2 className="text-4xl md:text-5xl font-serif font-bold text-secondary">My Plants</h2>
          </div>
          <button
            onClick={() => navigate('/plants/new')}
            className="mt-4 md:mt-0 bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-primary/30 flex items-center gap-2"
          >
            <span>+</span> Add Plant
          </button>
        </div>
        
        {plants.length === 0 ? (
           <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-secondary/20">
              <div className="w-20 h-20 bg-secondary/5 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">🌱</div>
              <h3 className="text-2xl font-serif font-bold text-secondary mb-2">Your garden is empty</h3>
              <p className="text-gray-500 mb-8">Start your journey by adding your first plant.</p>
              <button onClick={() => navigate('/plants/new')} className="text-primary font-bold hover:underline">Add a plant now</button>
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {plants.map((plant) => (
              <div key={plant._id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-secondary/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src={plant.imageUrl} alt={plant.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                     <button onClick={() => handleDelete(plant._id)} className="bg-white text-red-500 p-2 rounded-full shadow-lg hover:bg-red-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                     </button>
                  </div>
                </div>
                <div className="p-6 relative">
                    <div className="absolute -top-6 left-6 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                       {plant.species || 'Plant'}
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-secondary mb-2">{plant.name}</h3>
                    <div className="flex justify-between items-center mt-6">
                      <button
                          onClick={() => navigate(`/plants/${plant._id}`)}
                          className="text-secondary font-bold text-sm hover:text-primary transition-colors flex items-center gap-1"
                      >
                          View Details <span>➜</span>
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

export default MyPlants;
