import { useState } from 'react';
import { useSelector } from 'react-redux';
import { changePassword } from './userAPI';

const ChangePassword = () => {
  const { token } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await changePassword(token, formData);
      setMessage('Password updated successfully.');
    } catch (error) {
      setMessage('Failed to update password.');
    }
  };

  return (
    <div className="min-h-screen bg-light-bg p-6 font-sans flex items-center justify-center">
      <div className="w-full max-w-md">
        <button
          onClick={() => window.history.back()}
          className="mb-6 flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary transition-colors"
        >
          <span>←</span> Back
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-secondary/10">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-primary/10 text-primary p-3 rounded-xl text-2xl">🔒</span>
            <h2 className="text-3xl font-serif font-bold text-secondary">Change Password</h2>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-xl text-center font-bold ${message.includes('Failed') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary ml-1">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                onChange={handleChange}
                placeholder="Enter current password"
                className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary ml-1">New Password</label>
              <input
                type="password"
                name="newPassword"
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-secondary text-white font-bold py-4 rounded-xl hover:bg-primary transition-colors shadow-lg shadow-secondary/20 mt-2"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
