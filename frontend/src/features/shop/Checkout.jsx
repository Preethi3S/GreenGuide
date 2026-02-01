import axios from 'axios';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from './shopSlice';

const Checkout = () => {
  const cart = useSelector(state => state.shop.cart);
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = e => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!token) return alert('Please login to continue');

    const isFormValid = Object.values(shippingInfo).every(val => val.trim() !== '');
    if (!isFormValid) return alert('Please fill all shipping fields');

    if (cart.length === 0) return alert('Cart is empty');

    try {
      setLoading(true);
      const res = await axios.post(
        '/api/shop/place-order',
        {
          cartItems: cart,
          shippingInfo,
          totalAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Order placed successfully!');
      dispatch(clearCart());
      navigate('/orders');
    } catch (error) {
      alert(error.response?.data?.message || 'Order failed. Try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-light-bg p-6 font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/cart')}
          className="mb-8 flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary transition-colors"
        >
          <span>←</span> Back to Cart
        </button>

        <h2 className="text-4xl font-serif font-bold text-secondary mb-10 text-center">Checkout</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Shipping Form */}
          <motion.div
            className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-secondary/10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="bg-primary/10 text-primary p-3 rounded-xl text-2xl">🚚</span>
              <h3 className="text-2xl font-serif font-bold text-secondary">Shipping Details</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary ml-1">Full Address</label>
                <input
                  type="text"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  placeholder="Street address, apartment, suite, etc."
                  className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary ml-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary ml-1">State</label>
                  <input
                    type="text"
                    name="state"
                    value={shippingInfo.state}
                    onChange={handleInputChange}
                    className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary ml-1">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={shippingInfo.country}
                    onChange={handleInputChange}
                    className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary ml-1">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={shippingInfo.pincode}
                    onChange={handleInputChange}
                    className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary ml-1">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={shippingInfo.phone}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  className="w-full bg-light-bg border border-secondary/20 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-secondary/10">
              <h3 className="text-2xl font-serif font-bold text-secondary mb-6">Order Summary</h3>
              
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 border-b border-dashed border-gray-100 pb-4 last:border-0">
                    <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                       {item.product.image ? (
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                       ) : (
                          <div className="w-full h-full flex items-center justify-center text-xl">🌱</div>
                       )}
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-secondary">{item.product.name}</h4>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-primary">₹{item.product.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 mt-6 pt-6 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold">Free</span>
                </div>
                <div className="flex justify-between text-2xl font-bold text-secondary pt-4 border-t border-dashed border-gray-200">
                  <span>Total</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className={`w-full mt-8 py-4 rounded-xl font-bold text-white transition-all shadow-lg ${
                  loading
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-secondary hover:bg-primary shadow-secondary/20'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span> Processing...
                  </span>
                ) : (
                  `Place Order • ₹${totalAmount}`
                )}
              </button>
            </div>
            
            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 flex items-start gap-4">
               <span className="text-2xl">🛡️</span>
               <div>
                  <h4 className="font-bold text-secondary mb-1">Secure Payment</h4>
                  <p className="text-sm text-gray-600">Your payment information is processed securely. We do not store credit card details.</p>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;
