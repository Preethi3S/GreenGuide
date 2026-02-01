import axios from 'axios';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const MyOrders = () => {
  const { token } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [reviewModal, setReviewModal] = useState({ isOpen: false, productId: null, productName: '' });
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    axios.get('/api/shop/orders', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setOrders(res.data))
      .catch(err => console.error('Error fetching orders:', err));
  }, [token]);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Not Set';
    return new Date(dateStr).toLocaleDateString();
  };

  const openReviewModal = (productId, productName) => {
    setReviewModal({ isOpen: true, productId, productName });
    setRating(5);
    setComment('');
  };

  const submitReview = async () => {
    try {
      await axios.post(`/api/shop/products/${reviewModal.productId}/reviews`, 
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Review submitted successfully!');
      setReviewModal({ isOpen: false, productId: null, productName: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit review');
    }
  };

  return (
    <div className="min-h-screen bg-light-bg p-6 font-sans relative">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <span className="bg-primary/10 text-primary p-3 rounded-xl text-2xl">📦</span>
          <h2 className="text-4xl font-serif font-bold text-secondary">My Orders</h2>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-xl border border-secondary/10">
            <span className="text-6xl block mb-6 opacity-50">🛍️</span>
            <h3 className="text-2xl font-bold text-secondary mb-2">No orders yet</h3>
            <p className="text-gray-500 mb-8">Start shopping to fill your garden!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, idx) => (
              <div key={idx} className="bg-white rounded-3xl shadow-sm border border-secondary/10 overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-secondary/5 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-secondary/5">
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Order ID</p>
                    <p className="font-mono text-secondary font-bold">#{order._id.slice(-8).toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Date Placed</p>
                    <p className="font-bold text-secondary">{new Date(order.createdAt || Date.now()).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Amount</p>
                    <p className="font-bold text-primary text-xl">₹{order.totalAmount}</p>
                  </div>
                  <div>
                    <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${
                      order.paymentStatus === 'Paid' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {order.paymentStatus || 'Pending'}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="font-serif font-bold text-secondary mb-4">Items Ordered</h4>
                  <div className="space-y-4">
                    {order.products.map((item, i) => (
                      <div key={i} className="flex justify-between items-center border-b border-dashed border-gray-100 pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-xl">🌱</div>
                          <div>
                            <p className="font-bold text-secondary">{item.name}</p>
                            <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <p className="font-bold text-gray-700">₹{item.price * item.qty}</p>
                          {item.product ? (
                            <button 
                              onClick={() => openReviewModal(item.product._id, item.name)}
                              className="px-4 py-2 bg-primary/10 text-primary text-xs font-bold rounded-full hover:bg-primary hover:text-white transition-all"
                            >
                              Write Review
                            </button>
                          ) : (
                            <span className="text-xs text-gray-400 italic">Unavailable</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>🚚</span>
                      <span>Expected Delivery: <span className="font-bold text-secondary">{formatDate(order.deliveryDate)}</span></span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Modal */}
      {reviewModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setReviewModal({ ...reviewModal, isOpen: false })}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
            >
              <X size={24} />
            </button>
            
            <h3 className="text-2xl font-serif font-bold text-secondary mb-2">Write a Review</h3>
            <p className="text-gray-500 mb-6">How was your experience with <span className="font-bold text-primary">{reviewModal.productName}</span>?</p>
            
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-3xl transition-transform hover:scale-110 ${rating >= star ? 'text-yellow-400' : 'text-gray-200'}`}
                >
                  ★
                </button>
              ))}
            </div>

            <textarea
              className="w-full bg-light-bg border border-gray-200 rounded-xl p-4 mb-6 focus:outline-none focus:border-primary resize-none h-32"
              placeholder="Share your thoughts..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>

            <button
              onClick={submitReview}
              className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20"
            >
              Submit Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
