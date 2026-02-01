import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const EncyclopediaDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const { data } = await axios.get(`/api/encyclopedia/${id}`);
        setPlant(data);
      } catch (err) {
        toast.error('Failed to fetch plant details');
      } finally {
        setLoading(false);
      }
    };

    fetchPlant();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-600 mt-10">Loading details...</p>;
  }

  if (!plant) {
    return <p className="text-center text-red-500 mt-10">Plant not found.</p>;
  }

  return (
    <div className="min-h-screen bg-light-bg p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary transition-colors"
        >
          <span>←</span> Back to Encyclopedia
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-secondary/10">
          <div className="relative h-96">
            {plant.imageUrl ? (
              <img
                src={plant.imageUrl}
                alt={plant.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-secondary/5 flex items-center justify-center">
                 <span className="text-6xl">🌱</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white">
               <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                  {plant.species}
               </span>
               <h1 className="text-5xl font-serif font-bold mb-2">{plant.name}</h1>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               <div className="md:col-span-2 space-y-8">
                  <div>
                     <h3 className="text-xl font-serif font-bold text-secondary mb-4">About this Plant</h3>
                     <p className="text-gray-600 leading-relaxed text-lg">{plant.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <h4 className="font-bold text-secondary mb-2 flex items-center gap-2">
                           <span>🌍</span> Soil Type
                        </h4>
                        <p className="text-gray-600">{plant.soilType || 'Not specified'}</p>
                     </div>
                     <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <h4 className="font-bold text-secondary mb-2 flex items-center gap-2">
                           <span>🍂</span> Season
                        </h4>
                        <p className="text-gray-600">{plant.season || 'All Year'}</p>
                     </div>
                     <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <h4 className="font-bold text-secondary mb-2 flex items-center gap-2">
                           <span>🌾</span> Yield
                        </h4>
                        <p className="text-gray-600">{plant.yield || 'N/A'}</p>
                     </div>
                  </div>
               </div>
               
               <div className="md:col-span-1">
                  <div className="bg-secondary text-white p-8 rounded-2xl relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                     <h3 className="text-xl font-serif font-bold mb-6 relative z-10">Quick Facts</h3>
                     <ul className="space-y-4 relative z-10">
                        <li className="flex justify-between border-b border-white/10 pb-2">
                           <span className="text-gray-300">Added</span>
                           <span className="font-bold">{new Date(plant.createdAt || Date.now()).toLocaleDateString()}</span>
                        </li>
                        <li className="flex justify-between border-b border-white/10 pb-2">
                           <span className="text-gray-300">Updated</span>
                           <span className="font-bold">{new Date(plant.updatedAt).toLocaleDateString()}</span>
                        </li>
                     </ul>
                     <button className="w-full mt-8 bg-white text-secondary font-bold py-3 rounded-full hover:bg-primary hover:text-white transition-colors">
                        Share Plant
                     </button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncyclopediaDetails;
