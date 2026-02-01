import { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addEncyclopediaPlant } from './encyclopediaAPI';

const AddEncyclopediaPlant = () => {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    description: '',
    soilType: '',
    yield: '',
    season: '',
    image: null,
  });

  const { user } = useSelector((state) => state.auth);
  const token = user?.token;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (val) data.append(key, val);
    });

    try {
      const res = await addEncyclopediaPlant(data, token);
      toast.success('✅ Plant added successfully');
      navigate('/encyclopedia');
    } catch (err) {
      console.error('❌ Error adding plant:', err);
      toast.error('❌ Add failed');
    }
  };

  if (!user || !token) {
    return (
      <div className="min-h-screen bg-light-bg flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md">
          <span className="text-4xl mb-4 block">🚫</span>
          <h2 className="text-xl font-serif font-bold text-secondary mb-2">Access Denied</h2>
          <p className="text-gray-600">You must be logged in to contribute to the encyclopedia.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg p-6 font-sans flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary transition-colors"
        >
          <span>←</span> Back to Encyclopedia
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-secondary/10">
          <div className="flex items-center gap-3 mb-8">
            <span className="bg-primary/10 text-primary p-3 rounded-xl text-2xl">🌿</span>
            <h2 className="text-3xl font-serif font-bold text-secondary">Add New Plant</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary ml-1">Plant Name</label>
                <input
                  name="name"
                  placeholder="e.g. Tomato"
                  onChange={handleChange}
                  value={formData.name}
                  required
                  className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary ml-1">Species</label>
                <input
                  name="species"
                  placeholder="e.g. Solanum lycopersicum"
                  onChange={handleChange}
                  value={formData.species}
                  required
                  className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary ml-1">Description</label>
              <textarea
                name="description"
                placeholder="Describe the plant..."
                onChange={handleChange}
                value={formData.description}
                required
                rows="4"
                className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary ml-1">Soil Type</label>
                <input
                  name="soilType"
                  placeholder="e.g. Loamy"
                  onChange={handleChange}
                  value={formData.soilType}
                  className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary ml-1">Yield</label>
                <input
                  name="yield"
                  placeholder="e.g. 5kg/plant"
                  onChange={handleChange}
                  value={formData.yield}
                  className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary ml-1">Season</label>
                <input
                  name="season"
                  placeholder="e.g. Summer"
                  onChange={handleChange}
                  value={formData.season}
                  className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary ml-1">Plant Image</label>
              <div className="relative">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-secondary/10 file:text-secondary hover:file:bg-secondary/20"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-secondary text-white font-bold py-4 rounded-xl hover:bg-primary transition-colors shadow-lg shadow-secondary/20 mt-4"
            >
              Add Plant to Encyclopedia
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEncyclopediaPlant;
