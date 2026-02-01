import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "./authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    adminCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(registerUser(formData));
    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Welcome to GreenGuide 🌱");
      navigate("/dashboard");
    } else {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] border border-gray-100"
      >
        {/* Left Side - Image & Text */}
        <div className="w-full md:w-1/2 relative p-12 flex flex-col justify-center text-white">
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/bg-2.jpg" 
              alt="Leaves" 
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
          </div>
          
          <div className="relative z-10 max-w-md">
            <h1 className="text-5xl font-serif font-bold mb-6 leading-tight">Let's Get Started</h1>
            <p className="text-gray-100 text-lg leading-relaxed font-light">
              Join our community. Celebrate the love in your life with a gift that grows on.
            </p>
            
            <div className="mt-12 flex items-center gap-2">
              <div className="w-8 h-8 border border-white rounded flex items-center justify-center text-white text-xs font-serif">B</div>
              <span className="text-xl font-serif font-bold text-white">Blooming</span>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center relative">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-3xl font-serif font-bold text-gray-800 mb-10">Sign up</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Your Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-800 focus:outline-none focus:border-primary transition-colors placeholder-gray-400"
                  placeholder="Enter your name"
                />
              </div>

              <div className="group">
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Your Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-800 focus:outline-none focus:border-primary transition-colors placeholder-gray-400"
                  placeholder="Enter your email"
                />
              </div>

              <div className="group">
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Create Password</label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-800 focus:outline-none focus:border-primary transition-colors placeholder-gray-400"
                  placeholder="Create password"
                />
              </div>

              <div className="group">
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Admin Code (Optional)</label>
                <input
                  name="adminCode"
                  value={formData.adminCode}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-800 focus:outline-none focus:border-primary transition-colors placeholder-gray-400"
                  placeholder="Enter admin code"
                />
              </div>

              <div className="pt-6 flex items-center justify-between">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-10 rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-primary/20"
                >
                  {loading ? "Signing up..." : "Sign up"}
                </button>
                
                <div className="text-right">
                  <p className="text-gray-500 text-sm mb-1">Already a Member?</p>
                  <Link to="/login" className="text-primary hover:text-primary-hover transition-colors font-medium">
                    Sign in here
                  </Link>
                </div>
              </div>
            </form>


          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
