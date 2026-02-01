import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "./userAPI";
import "./UserDashboard.css";

const UserDashboard = () => {
  const [profile, setProfile] = useState({});
  const [weather, setWeather] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(user.token);
        setProfile(data);
      } catch {
        toast.error("Failed to load profile");
      }
    };

    const fetchWeather = () => {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          const { data } = await axios.get(
            `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=3`
          );
          setWeather(formatWeather(data));
        },
        async () => {
          const { data } = await axios.get(
            `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Chennai&days=3`
          );
          setWeather(formatWeather(data));
        }
      );
    };

    fetchProfile();
    fetchWeather();
  }, [user, navigate]);

  const formatWeather = (data) => ({
    current: {
      condition: data.current.condition.text,
      temperature: data.current.temp_c,
      location: data.location.name,
    },
    forecast: data.forecast.forecastday.map((d) => ({
      date: d.date,
      condition: d.day.condition.text,
      icon: d.day.condition.icon,
      max: d.day.maxtemp_c,
      min: d.day.mintemp_c,
    })),
  });

  const getWeatherAdvice = (c) => {
    const x = c.toLowerCase();
    if (x.includes("rain")) return "🌧 Skip watering today";
    if (x.includes("cloud")) return "☁ Light watering recommended";
    if (x.includes("sun") || x.includes("clear")) return "☀ Perfect watering day";
    return "🌿 Monitor plant moisture";
  };

  const featureLinks = [
    { title: "My Plants", desc: "View all your plants", link: "/plants" },
    { title: "Growth Tracker", desc: "Track plant milestones", link: "/growth" },
    { title: "Water Logs", desc: "Check watering history", link: "/water" },
    { title: "Disease Detector", desc: "Scan plant diseases", link: "/disease-detector" },
    { title: "Reminders", desc: "Manage care schedule", link: "/reminders" },
    { title: "Community", desc: "Share & learn", link: "/community" },
  ];

  return (
    <div className="min-h-screen bg-light-bg text-light-text font-sans">
      {/* Hero Section */}
      <div className="bg-secondary text-white relative overflow-hidden py-12 px-6 mb-8 rounded-3xl shadow-xl mx-auto max-w-7xl">
         <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
            {/* Left Text */}
            <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
               <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">B</div>
                  <span className="font-serif font-bold text-lg">Blooming</span>
               </div>
               <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-4">
                  Welcome Back, <br/>
                  <span className="text-primary">{user?.name || 'Gardener'}</span>
               </h1>
               <p className="text-gray-300 mb-6 max-w-md mx-auto md:mx-0">
                  Your garden is looking lovely today. Here is what needs your attention.
               </p>
            </div>

            {/* Right Image/Circle */}
            <div className="md:w-1/2 flex justify-center relative">
               <div className="w-64 h-64 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border-4 border-white/20 shadow-2xl relative overflow-hidden">
                  {/* Placeholder for user image or decorative plant */}
                  <motion.img 
                    src="/images/plant-hero.jpg" 
                    alt="Dashboard Hero" 
                    className="w-full h-full object-cover opacity-90"
                    animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />
               </div>
            </div>
         </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12 px-6">
        
        {/* Features Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {featureLinks.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="group relative bg-white border border-gray-100 p-8 rounded-2xl cursor-pointer overflow-hidden hover:shadow-xl hover:shadow-gray-200 transition-all duration-300"
              onClick={() => navigate(feature.link)}
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-serif font-bold text-secondary mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed group-hover:text-secondary transition-colors">{feature.desc}</p>
                <div className="mt-8 w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                  <span className="text-lg text-gray-400 group-hover:text-white">➜</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Weather Panel */}
        <div className="lg:col-span-1 space-y-6">
           <motion.div 
             className="bg-secondary text-white border border-white/10 p-8 rounded-2xl relative overflow-hidden shadow-xl"
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
           >
              <h3 className="font-serif font-bold text-xl mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                Weather Forecast
              </h3>
              
              {weather ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-4xl font-bold text-white">{weather.current.temperature}°C</h2>
                      <p className="text-gray-300 mt-1">{weather.current.condition}</p>
                      <p className="text-primary text-sm font-bold mt-2 flex items-center gap-2">
                        📍 {weather.current.location}
                      </p>
                    </div>
                    <div className="text-right">
                       <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Advice</p>
                       <p className="text-sm text-white font-medium max-w-[120px] leading-tight">
                         {getWeatherAdvice(weather.current.condition)}
                       </p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/10">
                    {weather.forecast.map((d) => (
                      <div key={d.date} className="flex justify-between items-center text-sm group hover:bg-white/5 p-2 rounded-lg transition-colors">
                        <span className="text-gray-400">{new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                        <div className="flex items-center gap-3">
                          <img src={d.icon} alt="" className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity" />
                          <span className="text-white font-medium">{d.max}° <span className="text-gray-400">/ {d.min}°</span></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p>Analyzing weather data...</p>
                </div>
              )}
           </motion.div>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
