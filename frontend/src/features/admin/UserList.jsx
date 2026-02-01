import { NoSymbolIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { banUserById, getAllUsers } from './adminAPI';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleBan = async (id) => {
    try {
      await banUserById(id);
      toast.success('User banned');
      fetchUsers();
    } catch {
      toast.error('Ban failed');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-light-bg p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => window.history.back()}
          className="mb-6 flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary transition-colors"
        >
          <span>←</span> Back
        </button>

        <div className="flex items-center gap-3 mb-8">
          <span className="bg-primary/10 text-primary p-3 rounded-xl text-2xl">👥</span>
          <h2 className="text-3xl font-serif font-bold text-secondary">User Management</h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : users.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center border border-secondary/10">
            <p className="text-gray-500">No users found.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-secondary/10">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary text-white text-left">
                  <tr>
                    <th className="p-6 font-serif font-bold">Name</th>
                    <th className="p-6 font-serif font-bold">Email</th>
                    <th className="p-6 font-serif font-bold">Role</th>
                    <th className="p-6 font-serif font-bold">Status</th>
                    <th className="p-6 font-serif font-bold text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary/10">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-primary/5 transition-colors">
                      <td className="p-6 font-medium text-secondary">{u.name}</td>
                      <td className="p-6 text-gray-600">{u.email}</td>
                      <td className="p-6 capitalize text-secondary">{u.role}</td>
                      <td className="p-6 font-medium">
                        {u.isBanned ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm">
                            <NoSymbolIcon className="w-4 h-4" /> Banned
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-600 text-sm">
                            Active
                          </span>
                        )}
                      </td>
                      <td className="p-6 text-center">
                        {!u.isBanned && (
                          <button
                            onClick={() => handleBan(u._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors shadow-lg shadow-red-500/20"
                          >
                            Ban User
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
