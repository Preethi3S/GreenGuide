import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-light-bg p-6 font-sans flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-xl border border-secondary/10 p-12 text-center max-w-lg w-full">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-5xl">🎉</span>
        </div>
        
        <h1 className="text-4xl font-serif font-bold text-secondary mb-4">Order Placed!</h1>
        <p className="text-gray-600 mb-10 text-lg leading-relaxed">
          Thank you for shopping with Blooming. Your green friends are on their way!
        </p>
        
        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate('/orders')}
            className="w-full bg-secondary text-white px-8 py-4 rounded-xl font-bold hover:bg-secondary/90 transition-colors shadow-lg shadow-secondary/20"
          >
            View My Orders
          </button>
          <button
            onClick={() => navigate('/shop')}
            className="w-full bg-white text-secondary border-2 border-secondary/10 px-8 py-4 rounded-xl font-bold hover:bg-secondary/5 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
