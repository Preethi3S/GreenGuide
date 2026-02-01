
import { useState } from 'react';

const Footer = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  return (
    <>
      <footer className="bg-secondary text-white py-3 px-6 border-t border-white/10 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
             <span className="font-serif font-bold text-primary">Blooming</span>
             <span className="text-gray-500">© 2026</span>
          </div>

          <div className="flex gap-4 text-gray-400">
             <button onClick={() => setShowPrivacy(true)} className="hover:text-primary">Privacy</button>
             <button onClick={() => setShowTerms(true)} className="hover:text-primary">Terms</button>
          </div>
        </div>
      </footer>

      {/* Privacy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white text-gray-800 p-6 rounded-lg max-w-md w-full shadow-xl relative">
            <button 
              onClick={() => setShowPrivacy(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-primary">Privacy Policy</h2>
            <div className="text-sm space-y-2 max-h-60 overflow-y-auto">
              <p>At Blooming, we value your privacy.</p>
              <p>1. <strong>Data Collection:</strong> We collect basic user information to improve your gardening experience.</p>
              <p>2. <strong>Usage:</strong> Your data is used to provide personalized plant recommendations and track growth.</p>
              <p>3. <strong>Security:</strong> We implement industry-standard security measures to protect your data.</p>
              <p>4. <strong>Sharing:</strong> We do not sell your personal data to third parties.</p>
            </div>
            <div className="mt-4 flex justify-end">
              <button 
                onClick={() => setShowPrivacy(false)}
                className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Terms Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white text-gray-800 p-6 rounded-lg max-w-md w-full shadow-xl relative">
            <button 
              onClick={() => setShowTerms(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-primary">Terms of Service</h2>
            <div className="text-sm space-y-2 max-h-60 overflow-y-auto">
              <p>Welcome to Blooming!</p>
              <p>1. <strong>Acceptance:</strong> By using our platform, you agree to these terms.</p>
              <p>2. <strong>User Conduct:</strong> You agree to use the platform respectfully and legally.</p>
              <p>3. <strong>Content:</strong> You retain rights to your content, but grant us a license to display it.</p>
              <p>4. <strong>Termination:</strong> We reserve the right to terminate accounts that violate these terms.</p>
            </div>
            <div className="mt-4 flex justify-end">
              <button 
                onClick={() => setShowTerms(false)}
                className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
