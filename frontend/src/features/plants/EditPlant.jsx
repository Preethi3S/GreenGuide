import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchMyPlants, updatePlant } from './plantAPI';

const EditPlant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    species: '',
    description: '',
    waterSchedule: '',
    plantedDate: '',
    sunlightRequirement: '',
    soilType: '',
    healthStatus: '',
    growthStage: '',
    tags: '',
    location: '',
    idealTemperature: '',
    isPublic: false,
    image: null,
    imageUrl: '',
  });

  useEffect(() => {
    const loadPlant = async () => {
      try {
        const plants = await fetchMyPlants(token);
        const plant = plants.find((p) => p._id === id);
        if (plant) {
          setFormData((prev) => ({
            ...prev,
            ...plant,
            tags: plant.tags?.join(', ') || '',
            imageUrl: plant.imageUrl || '',
          }));
        }
      } catch (err) {
        toast.error('Failed to load plant');
      }
    };
    loadPlant();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'tags') {
          formDataToSend.append('tags', value.split(',').map(tag => tag.trim()));
        } else if (key === 'image' && value) {
          formDataToSend.append('image', value);
        } else if (key !== 'imageUrl' && value !== '' && value !== null) {
          formDataToSend.append(key, value);
        }
      });

      await updatePlant(id, formDataToSend, token);
      toast.success('Plant updated!');
      navigate('/plants');
    } catch (err) {
      toast.error('Update failed');
    }
  };

  return (
    <div className="min-h-screen bg-light-bg py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-secondary/10">
        <div className="bg-secondary py-8 px-8 text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/images/pattern.png')]"></div>
           <h2 className="text-3xl font-serif font-bold text-white relative z-10">Edit Plant</h2>
           <p className="text-primary mt-2 relative z-10 font-medium">Update your plant's details</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-sm font-bold text-gray-700 ml-1">Plant Name</label>
                 <input name="name" value={formData.name} onChange={handleChange} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" required />
              </div>
              <div className="space-y-2">
                 <label className="text-sm font-bold text-gray-700 ml-1">Species</label>
                 <input name="species" value={formData.species} onChange={handleChange} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" required />
              </div>
          </div>
          
          <div className="space-y-2">
             <label className="text-sm font-bold text-gray-700 ml-1">Description</label>
             <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" rows="3" placeholder="Description" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="waterSchedule" value={formData.waterSchedule} onChange={handleChange} placeholder="Water Schedule" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" />
              <input type="date" name="plantedDate" value={formData.plantedDate?.substring(0, 10)} onChange={handleChange} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" />
              <input name="sunlightRequirement" value={formData.sunlightRequirement} onChange={handleChange} placeholder="Sunlight" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" />
              <input name="soilType" value={formData.soilType} onChange={handleChange} placeholder="Soil Type" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" />
              <input name="healthStatus" value={formData.healthStatus} onChange={handleChange} placeholder="Health Status" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" />
              <input name="growthStage" value={formData.growthStage} onChange={handleChange} placeholder="Growth Stage" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" />
          </div>
          
          <input name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags (comma-separated)" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" />

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <input type="checkbox" name="isPublic" checked={formData.isPublic} onChange={handleChange} className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary" />
            <span className="text-gray-700 font-medium">Make this plant public</span>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary transition-colors bg-gray-50">
              {formData.imageUrl && (
                  <img src={formData.imageUrl} alt="Current" className="w-32 h-32 object-cover rounded-lg mx-auto mb-4" />
              )}
              <p className="text-gray-500 mb-4">Update photo (optional)</p>
              <input type="file" name="image" accept="image/*" onChange={handleFileChange} className="w-full max-w-xs mx-auto text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-primary file:text-white hover:file:bg-primary-hover cursor-pointer" />
          </div>

          <button type="submit" className="w-full bg-primary text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-primary/30 hover:bg-primary-hover hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPlant;
