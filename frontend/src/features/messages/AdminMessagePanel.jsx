import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const AdminMessagePanel = () => {
  const [messages, setMessages] = useState([]);
  const { user } = useSelector((state) => state.auth); // ✅ grab token

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get('/api/messages', {
          headers: {
            Authorization: `Bearer ${user.token}`, // ✅ send token
          },
        });
        setMessages(res.data);
      } catch (err) {
        console.error('Failed to fetch messages', err);
      }
    };
    if (user?.token) fetchMessages(); // only fetch if user is available
  }, [user]);

  const replyHandler = async (id) => {
    const reply = prompt('Enter your reply:');
    if (reply) {
      try {
        await axios.put(`/api/messages/${id}/reply`, { reply }, {
          headers: {
            Authorization: `Bearer ${user.token}`, // ✅ again here
          },
        });
        alert('Replied');
        const updated = await axios.get('/api/messages', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setMessages(updated.data);
      } catch (err) {
        alert('Failed to send reply');
        console.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-light-bg p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl border border-secondary/10 p-8">
          <div className="flex items-center gap-3 mb-8">
            <span className="bg-primary/10 text-primary p-3 rounded-xl text-2xl">📬</span>
            <h2 className="text-3xl font-serif font-bold text-secondary">User Messages</h2>
          </div>

          {messages.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No messages found.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {messages.map((msg) => (
                <div key={msg._id} className="border border-secondary/10 rounded-2xl p-6 bg-light-bg hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="font-bold text-secondary">{msg.user?.name || 'Unknown'}</span>
                        <span>•</span>
                        <span>{msg.user?.email || 'N/A'}</span>
                      </div>
                      
                      <div>
                        <p className="font-serif font-bold text-secondary text-lg mb-1">{msg.subject}</p>
                        <p className="text-gray-600 leading-relaxed">{msg.body}</p>
                      </div>

                      {msg.adminReply && (
                        <div className="bg-green-50 border border-green-100 rounded-xl p-4 mt-4">
                          <p className="text-green-800 font-bold text-sm mb-1 flex items-center gap-2">
                            <span>✅</span> Replied
                          </p>
                          <p className="text-green-700">{msg.adminReply}</p>
                        </div>
                      )}
                    </div>

                    {!msg.adminReply && (
                      <div className="flex items-start">
                        <button
                          onClick={() => replyHandler(msg._id)}
                          className="px-6 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 whitespace-nowrap"
                        >
                          Reply
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessagePanel;
