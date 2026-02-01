import axios from 'axios';
import { motion } from 'framer-motion';
import { SendHorizonal, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const RealChatBotGPT = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! 🌿 Ask me anything about gardening — pests, fertilizers, or plant care.' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setInput('');

    try {
      const { data } = await axios.post('/api/chat', { message: input });
      const botMessage = { sender: 'bot', text: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Chat error:', err.response?.data || err.message);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: '❌ Error: ' + (err.response?.data?.error || 'Bot failed'),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto h-[85vh] flex flex-col border border-secondary/10 rounded-3xl shadow-2xl bg-white p-6 relative"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition"
      >
        <X size={24} />
      </button>

      <div className="text-center mb-6">
        <h1 className="text-3xl font-serif font-bold text-secondary">🌱 GreenBot</h1>
        <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Your Gardening Companion</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 p-6 bg-light-bg rounded-2xl border border-secondary/5">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-5 py-3 rounded-2xl text-sm max-w-[80%] shadow-sm font-medium leading-relaxed
                ${msg.sender === 'user'
                  ? 'bg-primary text-white rounded-br-none'
                  : 'bg-white text-secondary border border-secondary/10 rounded-bl-none'}`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-secondary border border-secondary/10 px-5 py-3 rounded-2xl rounded-bl-none text-sm animate-pulse font-medium">
              Typing...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="flex mt-6 gap-3">
        <input
          type="text"
          className="flex-1 bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors placeholder-gray-400"
          placeholder="Ask about watering, pests, etc..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="bg-secondary text-white p-3 rounded-xl hover:bg-primary transition-colors shadow-lg shadow-secondary/20 disabled:opacity-50 disabled:shadow-none"
        >
          <SendHorizonal size={20} />
        </button>
      </div>
    </motion.div>
  );
};

export default RealChatBotGPT;
