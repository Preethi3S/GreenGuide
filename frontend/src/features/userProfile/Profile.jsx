import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserProfile, updateUserProfile } from "./userAPI";

const Profile = () => {
  const { token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "",
    preferences: {
      notificationFrequency: "daily",
      gardeningLevel: "beginner",
      gardenType: "indoor",
      preferredPlants: [],
    },
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(token);
        setFormData({
          name: data.name,
          email: data.email,
          avatar: data.avatar || "",
          preferences: {
            notificationFrequency: data.preferences?.notificationFrequency || "daily",
            gardeningLevel: data.preferences?.gardeningLevel || "beginner",
            gardenType: data.preferences?.gardenType || "indoor",
            preferredPlants: data.preferences?.preferredPlants || [],
          },
          password: "",
        });
        setPreview(data.avatar || "");
      } catch {
        setMessage("Failed to fetch profile");
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["notificationFrequency", "gardeningLevel", "gardenType"].includes(name)) {
      setFormData({
        ...formData,
        preferences: {
          ...formData.preferences,
          [name]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePreferredPlantsChange = (e) => {
    const plantsArray = e.target.value.split(",").map((plant) => plant.trim());
    setFormData({
      ...formData,
      preferences: {
        ...formData.preferences,
        preferredPlants: plantsArray,
      },
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, avatar: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append("name", formData.name);
    form.append("password", formData.password);
    form.append("preferences", JSON.stringify(formData.preferences));
    if (formData.avatar instanceof File) {
      form.append("avatar", formData.avatar);
    }

    try {
      await updateUserProfile(token, form);
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light-bg p-6 font-sans flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <button
          onClick={() => window.history.back()}
          className="mb-6 flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary transition-colors"
        >
          <span>←</span> Back
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-secondary/10">
          <div className="flex items-center gap-3 mb-8">
            <span className="bg-primary/10 text-primary p-3 rounded-xl text-2xl">👤</span>
            <h2 className="text-3xl font-serif font-bold text-secondary">Edit Profile</h2>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-xl text-center font-bold ${message.includes('Failed') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center mb-8">
              <div className="relative w-32 h-32 mb-4 group cursor-pointer">
                <img
                  src={preview || "https://via.placeholder.com/150"}
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white font-bold text-sm">Change</span>
                </div>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <p className="text-sm text-gray-500">Click to upload new photo</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary ml-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary ml-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary ml-1">New Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                placeholder="Leave blank to keep unchanged"
              />
            </div>

            <div className="border-t border-gray-100 pt-6 mt-6">
              <h3 className="text-xl font-serif font-bold text-secondary mb-4">Preferences</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary ml-1">Gardening Level</label>
                  <select
                    name="gardeningLevel"
                    value={formData.preferences.gardeningLevel}
                    onChange={handleChange}
                    className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors appearance-none"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary ml-1">Garden Type</label>
                  <select
                    name="gardenType"
                    value={formData.preferences.gardenType}
                    onChange={handleChange}
                    className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors appearance-none"
                  >
                    <option value="indoor">Indoor</option>
                    <option value="balcony">Balcony</option>
                    <option value="terrace">Terrace</option>
                    <option value="backyard">Backyard</option>
                    <option value="community">Community</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <label className="text-sm font-bold text-secondary ml-1">Notification Frequency</label>
                <select
                  name="notificationFrequency"
                  value={formData.preferences.notificationFrequency}
                  onChange={handleChange}
                  className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors appearance-none"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="none">None</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary ml-1">Preferred Plants</label>
                <input
                  type="text"
                  name="preferredPlants"
                  value={formData.preferences.preferredPlants.join(", ")}
                  onChange={handlePreferredPlantsChange}
                  className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  placeholder="e.g., Rose, Tulsi, Aloe Vera"
                />
                <p className="text-xs text-gray-500 ml-1">Separate multiple plants with commas</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full font-bold py-4 rounded-xl transition-colors shadow-lg shadow-secondary/20 mt-4 ${
                loading 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-secondary text-white hover:bg-primary'
              }`}
            >
              {loading ? "Updating Profile..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
