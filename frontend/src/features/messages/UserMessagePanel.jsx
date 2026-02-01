import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const UserMessagePanel = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useSelector((state) => state.auth); // get token

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get('/api/messages/mine', {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        setMessages(res.data);
      } catch (err) {
        console.error('Error fetching user messages:', err);
        setError('Failed to load messages. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchMessages();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-light-bg p-6 font-sans">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => window.history.back()}
          className="mb-6 flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary transition-colors"
        >
          <span>←</span> Back
        </button>

        <div className="bg-white rounded-3xl shadow-xl border border-secondary/10 p-8">
          <div className="flex items-center gap-3 mb-8">
            <span className="bg-primary/10 text-primary p-3 rounded-xl text-2xl">📨</span>
            <h2 className="text-3xl font-serif font-bold text-secondary">Your Messages</h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl font-bold text-center">
              {error}
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>You haven’t sent any messages yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className="border border-secondary/10 rounded-2xl p-6 bg-light-bg hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="font-serif font-bold text-secondary text-lg mb-2">📌 {msg.subject}</p>
                      <p className="text-gray-600 leading-relaxed">{msg.body}</p>
                    </div>
                    
                    <div className="border-t border-secondary/10 pt-4">
                      {msg.adminReply ? (
                        <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                          <p className="text-green-800 font-bold mb-1 flex items-center gap-2">
                            <span>✅</span> Admin Reply
                          </p>
                          <p className="text-green-700">{msg.adminReply}</p>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-xl text-sm font-bold border border-orange-100">
                          <span>⏳</span> Waiting for admin reply...
                        </div>
                      )}
                    </div>
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

export default UserMessagePanel;
