import { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewPlant } from './plantAPI';

const AddPlant = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

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
  });

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
          formDataToSend.append('tags', value.split(',').map((tag) => tag.trim()));
        } else if (value !== null && value !== '') {
          formDataToSend.append(key, value);
        }
      });

      await addNewPlant(formDataToSend, token);
      toast.success('Plant added!');
      navigate('/plants');
    } catch (err) {
      console.error(err);
      toast.error('Failed to add plant');
    }
  };

  return (
    <div className="min-h-screen bg-light-bg py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-secondary/10">
        <div className="bg-secondary py-8 px-8 text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('/images/pattern.png')]"></div>
           <h2 className="text-3xl font-serif font-bold text-white relative z-10">Add New Plant</h2>
           <p className="text-primary mt-2 relative z-10 font-medium">Expand your digital garden</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-sm font-bold text-gray-700 ml-1">Plant Name</label>
                 <input name="name" placeholder="e.g. Monstera Deliciosa" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                 <label className="text-sm font-bold text-gray-700 ml-1">Species</label>
                 <input name="species" placeholder="e.g. Araceae" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" onChange={handleChange} required />
              </div>
          </div>
          
          <div className="space-y-2">
             <label className="text-sm font-bold text-gray-700 ml-1">Description</label>
             <textarea name="description" placeholder="Tell us about your plant..." className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" rows="3" onChange={handleChange} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="waterSchedule" placeholder="Water Schedule" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" onChange={handleChange} />
              <input type="date" name="plantedDate" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" onChange={handleChange} />
              <input name="sunlightRequirement" placeholder="Sunlight Needs" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" onChange={handleChange} />
              <input name="soilType" placeholder="Soil Type" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" onChange={handleChange} />
              <input name="healthStatus" placeholder="Current Health" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" onChange={handleChange} />
              <input name="growthStage" placeholder="Growth Stage" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" onChange={handleChange} />
              <input name="location" placeholder="Location in Home" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" onChange={handleChange} />
              <input name="idealTemperature" placeholder="Ideal Temp" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" onChange={handleChange} />
          </div>
          
          <input name="tags" placeholder="Tags (comma-separated)" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all" onChange={handleChange} />

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <input type="checkbox" name="isPublic" checked={formData.isPublic} onChange={handleChange} className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary" />
            <span className="text-gray-700 font-medium">Make this plant public for the community</span>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary transition-colors bg-gray-50">
              <div className="mb-4 text-4xl">📸</div>
              <p className="text-gray-500 mb-4">Upload a photo of your plant</p>
              <input type="file" name="image" accept="image/*" onChange={handleFileChange} className="w-full max-w-xs mx-auto text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-primary file:text-white hover:file:bg-primary-hover cursor-pointer" />
          </div>

          <button type="submit" className="w-full bg-primary text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-primary/30 hover:bg-primary-hover hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            Add to Garden
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPlant;
