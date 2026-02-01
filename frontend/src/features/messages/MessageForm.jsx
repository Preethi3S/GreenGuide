import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendMessageToAdmin } from '../notifications/notificationAPI.js';

const MessageForm = () => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await sendMessageToAdmin({ subject, body });
      setSubject('');
      setBody('');
      alert('Message sent to admin');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to send message');
      console.error(error);
    }
  };

  const handleViewMessages = () => {
    navigate('/my-messages');
  };

  return (
    <div className="min-h-screen bg-light-bg p-6 font-sans flex items-center justify-center">
      <div className="w-full max-w-lg">
        <button
          onClick={() => window.history.back()}
          className="mb-6 flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary transition-colors"
        >
          <span>←</span> Back
        </button>

        <div className="bg-white shadow-xl rounded-3xl p-8 border border-secondary/10">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <span className="bg-primary/10 text-primary p-3 rounded-xl text-2xl">📬</span>
            <h2 className="text-2xl font-serif font-bold text-secondary">Contact Admin</h2>
          </div>

          <form onSubmit={submitHandler} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary ml-1">Subject</label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject"
                required
                className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-secondary ml-1">Message</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Type your message..."
                required
                rows={6}
                className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-secondary text-white font-bold py-4 rounded-xl hover:bg-primary transition-colors shadow-lg shadow-secondary/20"
            >
              Send Message
            </button>
          </form>

          <button
            onClick={handleViewMessages}
            className="w-full mt-4 bg-light-bg text-secondary font-bold py-4 rounded-xl hover:bg-secondary/10 transition-colors border border-secondary/10"
          >
            📄 View My Messages
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageForm;
