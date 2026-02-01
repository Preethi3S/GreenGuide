import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const EncyclopediaList = () => {
  const [plants, setPlants] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Access userInfo (ensure fallback between user/userInfo)
  const userInfo = useSelector((state) => state.auth.user || state.auth.userInfo);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const { data } = await axios.get('/api/encyclopedia');
        setPlants(data);
        setFiltered(data);
      } catch (err) {
        toast.error('Failed to fetch encyclopedia data');
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  useEffect(() => {
    const results = plants.filter(
      (plant) =>
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.species.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiltered(results);
  }, [searchTerm, plants]);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this plant?');
    if (!confirm) return;

    if (!userInfo?.token) {
      toast.error('Unauthorized. Please login again.');
      return;
    }

    try {
      await axios.delete(`/api/encyclopedia/${id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setPlants(plants.filter((p) => p._id !== id));
      toast.success('Plant deleted');
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="min-h-screen bg-light-bg p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-secondary/10 pb-6">
          <div>
             <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Knowledge Base</span>
             <h2 className="text-4xl md:text-5xl font-serif font-bold text-secondary">Plant Encyclopedia</h2>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mt-6 md:mt-0 w-full md:w-auto">
            <div className="relative">
               <input
                 type="text"
                 placeholder="Search species..."
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="pl-4 pr-10 py-3 border border-gray-200 rounded-full focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm bg-white w-full md:w-64 transition-all shadow-sm"
               />
               <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            </div>
            
            {userInfo?.role === 'admin' && (
              <button
                onClick={() => navigate('/admin/encyclopedia/new')}
                className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-full font-bold transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
              >
                <span>+</span> Add Entry
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
             <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-secondary/20">
             <div className="w-20 h-20 bg-secondary/5 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">🌿</div>
             <h3 className="text-2xl font-serif font-bold text-secondary mb-2">No plants found</h3>
             <p className="text-gray-500">Try adjusting your search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filtered.map((plant) => (
              <div key={plant._id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col h-full">
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  {plant.imageUrl ? (
                    <img
                      src={plant.imageUrl}
                      alt={plant.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 bg-secondary/5">
                       <span className="text-4xl">🌱</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-secondary shadow-sm">
                     {plant.species}
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                   <h3 className="text-xl font-serif font-bold text-secondary mb-2 group-hover:text-primary transition-colors">{plant.name}</h3>
                   <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-1">{plant.description}</p>
                   
                   <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                      <button 
                         onClick={() => navigate(`/encyclopedia/${plant._id}`)}
                         className="text-secondary font-bold text-sm hover:text-primary transition-colors flex items-center gap-1"
                      >
                         Read More <span>➜</span>
                      </button>
                      
                      {userInfo?.role === 'admin' && (
                        <div className="flex gap-2">
                           <button onClick={() => navigate(`/admin/encyclopedia/${plant._id}/edit`)} className="text-gray-400 hover:text-primary">✏️</button>
                           <button onClick={() => handleDelete(plant._id)} className="text-gray-400 hover:text-red-500">🗑️</button>
                        </div>
                      )}
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

export default EncyclopediaList;
