import { useState } from 'react';
import RealChatBotGPT from './RealChatBotGPT';

const ChatWrapper = () => {
  const [showBot, setShowBot] = useState(false);

  return (
    <div>
      <button
        onClick={() => setShowBot(true)}
        className="fixed bottom-20 right-8 bg-primary text-white px-6 py-3 rounded-full shadow-xl hover:bg-primary-hover transition-all z-40 font-bold flex items-center gap-2 hover:-translate-y-1"
      >
        <span>💬</span> Chat with GreenBot
      </button>

      {showBot && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <RealChatBotGPT onClose={() => setShowBot(false)} />
        </div>
      )}
    </div>
  );
};

export default ChatWrapper;
