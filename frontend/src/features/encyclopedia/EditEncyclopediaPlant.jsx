import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
    fetchEncyclopediaDetail,
    updateEncyclopediaPlant,
} from './encyclopediaAPI';

const EditEncyclopediaPlant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    species: '',
    description: '',
    soilType: '',
    yieldAmount: '',
    season: '',
    image: null,
  });

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const data = await fetchEncyclopediaDetail(id);
        console.log("Fetched plant data:", data);

        setFormData({
          name: data.name || '',
          species: data.species || '',
          description: data.description || '',
          soilType: data.soilType || '',
          yieldAmount: data.yield || '', // ✅ alias backend field `yield`
          season: data.season || '',
          image: null,
        });
      } catch (err) {
        console.error('❌ Failed to fetch plant data:', err);
        toast.error('Failed to load plant data');
        navigate('/encyclopedia');
      }
    };

    fetchPlant();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    updatedData.append('name', formData.name);
    updatedData.append('species', formData.species);
    updatedData.append('description', formData.description);
    updatedData.append('soilType', formData.soilType);
    updatedData.append('season', formData.season);
    updatedData.append('yield', formData.yieldAmount); // ✅ backend expects 'yield'

    if (formData.image) {
      updatedData.append('image', formData.image); // ✅ only if image updated
    }

    try {
      await updateEncyclopediaPlant(id, updatedData, token);
      toast.success('🌿 Plant updated successfully');
      navigate('/encyclopedia');
    } catch (err) {
      console.error('❌ Failed to update plant:', err);
      toast.error('Failed to update plant');
    }
  };

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
            <span className="bg-primary/10 text-primary p-3 rounded-xl text-2xl">✏️</span>
            <h2 className="text-3xl font-serif font-bold text-secondary">Edit Plant</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary ml-1">Plant Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary ml-1">Species</label>
                <input
                  name="species"
                  value={formData.species}
                  onChange={handleChange}
                  placeholder="Species"
                  className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary ml-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                rows="4"
                className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary ml-1">Soil Type</label>
                <input
                  name="soilType"
                  value={formData.soilType}
                  onChange={handleChange}
                  placeholder="Soil Type"
                  className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary ml-1">Yield</label>
                <input
                  name="yieldAmount"
                  value={formData.yieldAmount}
                  onChange={handleChange}
                  placeholder="Yield Amount"
                  className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary ml-1">Season</label>
                <input
                  name="season"
                  value={formData.season}
                  onChange={handleChange}
                  placeholder="Season"
                  className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary ml-1">Update Image (Optional)</label>
              <div className="relative">
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  accept="image/*"
                  className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-secondary/10 file:text-secondary hover:file:bg-secondary/20"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-secondary text-white font-bold py-4 rounded-xl hover:bg-primary transition-colors shadow-lg shadow-secondary/20 mt-4"
            >
              Update Plant
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEncyclopediaPlant;
